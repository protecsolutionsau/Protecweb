import { Resend } from 'npm:resend@2.0.0';

interface ContactFormData {
  name: string;
  email: string;
  organisation?: string;
  message: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body
    const body: ContactFormData = await req.json();
    const { name, email, organisation, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: name, email, and message are required' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable not set');
      return new Response(
        JSON.stringify({ error: 'Email service configuration error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const resend = new Resend(resendApiKey);

    // Prepare email content
    const subject = `New Contact Form Submission from ${name}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #3366ff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Name:</strong>
            <span style="color: #6b7280; margin-left: 10px;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Email:</strong>
            <span style="color: #6b7280; margin-left: 10px;">${email}</span>
          </div>
          
          ${organisation ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #374151;">Organisation:</strong>
            <span style="color: #6b7280; margin-left: 10px;">${organisation}</span>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #374151;">Message:</strong>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 10px; border-left: 4px solid #3366ff;">
              <p style="color: #4b5563; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            This message was sent from the Protec Solutions contact form.
          </p>
        </div>
      </div>
    `;

    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${organisation ? `Organisation: ${organisation}` : ''}

Message:
${message}

---
This message was sent from the Protec Solutions contact form.
    `.trim();

    // Send email
    const emailResponse = await resend.emails.send({
      from: 'Protec Solutions <noreply@protecsolutions.com.au>',
      to: ['spkarthigeyan@gmail.com'],
      subject: subject,
      html: htmlContent,
      text: textContent,
      reply_to: email, // Allow easy reply to the sender
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email', 
          details: emailResponse.error 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});