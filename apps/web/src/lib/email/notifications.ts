// Email notification functions
// Note: This is a placeholder. In production, integrate with services like:
// - Resend (resend.com)
// - SendGrid
// - AWS SES
// - Postmark

export async function sendContactNotification(inquiry: any) {
    // TODO: Implement email sending to sales team
    console.log('Sending notification to sales team:', inquiry);

    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'AuditShield <notifications@auditshield.ai>',
    //   to: ['sales@auditshield.ai'],
    //   subject: `New ${inquiry.inquiryType} inquiry from ${inquiry.companyName}`,
    //   html: getNotificationTemplate(inquiry),
    // });

    return { success: true };
}

export async function sendAutoResponse(email: string, firstName: string) {
    // TODO: Implement auto-response email
    console.log('Sending auto-response to:', email);

    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'AuditShield <hello@auditshield.ai>',
    //   to: [email],
    //   subject: 'Thank you for contacting AuditShield',
    //   html: getAutoResponseTemplate(firstName),
    // });

    return { success: true };
}

function getNotificationTemplate(inquiry: any): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #667eea; }
          .value { margin-top: 5px; }
          .priority-high { color: #ef4444; font-weight: bold; }
          .priority-medium { color: #f59e0b; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact Inquiry</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Priority:</div>
              <div class="value priority-${inquiry.priority}">${inquiry.priority.toUpperCase()}</div>
            </div>
            
            <div class="field">
              <div class="label">Contact:</div>
              <div class="value">${inquiry.firstName} ${inquiry.lastName}</div>
              <div class="value">${inquiry.email}</div>
              ${inquiry.phone ? `<div class="value">${inquiry.phone}</div>` : ''}
            </div>
            
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${inquiry.companyName}</div>
              <div class="value">Size: ${inquiry.companySize} employees</div>
              ${inquiry.industry ? `<div class="value">Industry: ${inquiry.industry}</div>` : ''}
            </div>
            
            <div class="field">
              <div class="label">Inquiry Type:</div>
              <div class="value">${inquiry.inquiryType}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${inquiry.message}</div>
            </div>
            
            ${inquiry.preferredTime ? `
            <div class="field">
              <div class="label">Preferred Contact Time:</div>
              <div class="value">${inquiry.preferredTime}</div>
            </div>
            ` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
}

function getAutoResponseTemplate(firstName: string): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 40px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛡️ Thank You for Contacting AuditShield</h1>
          </div>
          <div class="content">
            <p>Hi ${firstName},</p>
            
            <p>Thank you for reaching out to AuditShield! We've received your inquiry and our team will get back to you within 24 hours.</p>
            
            <p>In the meantime, feel free to explore our resources:</p>
            
            <ul>
              <li><a href="https://auditshield.ai/documentation">Documentation</a></li>
              <li><a href="https://auditshield.ai/features">Features Overview</a></li>
              <li><a href="https://auditshield.ai/pricing">Pricing Plans</a></li>
            </ul>
            
            <p>If you have any urgent questions, you can also reach us at:</p>
            <p><strong>Email:</strong> hello@auditshield.ai<br>
            <strong>Phone:</strong> +1 (555) 123-4567</p>
            
            <p>Best regards,<br>
            The AuditShield Team</p>
            
            <div class="footer">
              <p>© 2026 AuditShield Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
