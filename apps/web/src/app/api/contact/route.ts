import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactInquiries, inquiryActivities } from '@/lib/db/schema';
import { contactFormSchema } from '@/lib/validations/contact';
import { sendContactNotification, sendAutoResponse } from '@/lib/email/notifications';
import { headers } from 'next/headers';

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
        return true;
    }

    if (limit.count >= 3) { // Max 3 requests per minute
        return false;
    }

    limit.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const headersList = headers();
        const forwarded = headersList.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : headersList.get('x-real-ip') || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse and validate request body
        const body = await request.json();
        const validatedData = contactFormSchema.parse(body);

        // Get tracking information
        const userAgent = headersList.get('user-agent') || '';
        const referrer = headersList.get('referer') || '';

        // Insert into database
        const [inquiry] = await db.insert(contactInquiries).values({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            phone: validatedData.phone || null,
            companyName: validatedData.companyName,
            companySize: validatedData.companySize,
            industry: validatedData.industry || null,
            website: validatedData.website || null,
            jobTitle: validatedData.jobTitle || null,
            inquiryType: validatedData.inquiryType,
            subject: validatedData.subject || null,
            message: validatedData.message,
            preferredContactMethod: validatedData.preferredContactMethod,
            preferredTime: validatedData.preferredTime || null,
            utmSource: validatedData.utmSource || null,
            utmMedium: validatedData.utmMedium || null,
            utmCampaign: validatedData.utmCampaign || null,
            ipAddress: ip,
            userAgent: userAgent,
            referrer: referrer,
            source: 'website',
            status: 'new',
            priority: determinePriority(validatedData),
        }).returning();

        // Log activity
        await db.insert(inquiryActivities).values({
            inquiryId: inquiry.id,
            activityType: 'note_added',
            description: 'Contact form submitted',
            performedBy: 'system',
        });

        // Send notifications (non-blocking)
        Promise.all([
            sendContactNotification(inquiry),
            sendAutoResponse(validatedData.email, validatedData.firstName),
        ]).catch(error => {
            console.error('Error sending emails:', error);
            // Don't fail the request if emails fail
        });

        return NextResponse.json({
            success: true,
            message: 'Thank you for contacting us! We\'ll get back to you soon.',
            inquiryId: inquiry.id,
        }, { status: 201 });

    } catch (error) {
        console.error('Contact form error:', error);

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid form data', details: error },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}

function determinePriority(data: any): string {
    // Enterprise companies get high priority
    if (data.companySize === '1000+' || data.companySize === '201-1000') {
        return 'high';
    }

    // Partnership inquiries get high priority
    if (data.inquiryType === 'partnership') {
        return 'high';
    }

    // Demo requests from mid-size companies get medium priority
    if (data.inquiryType === 'demo' && (data.companySize === '51-200' || data.companySize === '11-50')) {
        return 'medium';
    }

    return 'medium';
}
