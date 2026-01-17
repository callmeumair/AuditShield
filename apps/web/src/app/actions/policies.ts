'use server';

import { db } from '@/lib/db';
import { policies, organizations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

export async function addPolicy(formData: FormData) {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
        return { error: 'Unauthorized' };
    }

    // Find internal organization ID based on Clerk Org ID
    const orgs = await db.select().from(organizations).where(eq(organizations.clerkOrgId, orgId)).limit(1);
    if (orgs.length === 0) return { error: 'No organization found' };
    const organizationId = orgs[0].id;

    const toolName = formData.get('toolName') as string;
    const action = formData.get('action') as string;
    const reason = formData.get('reason') as string;

    if (!toolName) return { error: 'Tool name is required' };

    try {
        await db.insert(policies).values({
            organizationId,
            toolName,
            action: action || 'allow',
            reason,
            enabled: 'true'
        });

        revalidatePath('/dashboard/policies');
        return { success: true };
    } catch (error) {
        console.error('Failed to add policy:', error);
        return { error: 'Failed to add policy' };
    }
}

export async function deletePolicy(policyId: string) {
    const { userId } = await auth();
    if (!userId) return { error: 'Unauthorized' };

    try {
        await db.delete(policies).where(eq(policies.id, policyId));
        revalidatePath('/dashboard/policies');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to delete policy' };
    }
}
