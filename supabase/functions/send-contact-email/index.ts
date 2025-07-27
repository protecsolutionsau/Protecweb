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
  console.log('Received request:', req.method, req.url);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      console.log('Method not allowed:', req.method);
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Parse request body with error handling
    let requestData: ContactFormData;
    try {
      requestData = await req.json();
      console.log('Parsed request data:', { 
        name: requestData.name, 
        email: requestData.email, 
        organisation: requestData.organisation,
        messageLength: requestData.message?.length 
      });
    } catch (parseError) {
      console.error('Request parsing error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    const { name, email, organisation, message } = requestData;

    // Basic validation
    if (!name || !email || !message) {
      console.log('Validation failed - missing required fields:', { name: !!name, email: !!email, message: !!message });
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
      console.log('Invalid email format:', email);
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable not set');
      console.error('Available environment variables:', Object.keys(Deno.env.toObject()));
      return new Response(
        JSON.stringify({ 
          error: 'Email service not configured', 
          message: 'Email service not configured - missing RESEND_API_KEY environment variable',
          debug: 'Please set RESEND_API_KEY in Supabase project settings'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Initializing Resend with API key:', resendApiKey ? 'Present' : 'Missing');
    const resend = new Resend(resendApiKey);

    // Create HTML email body
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3366ff 0%, #2952cc 100%); color: white; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Website Contact</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Protec Solutions Contact Form</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              
              <!-- Contact Details -->
              <div style="margin-bottom: 30px;">
                <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Contact Information</h2>
                
                <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 15px;">
                  <div style="flex: 1; min-width: 200px;">
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3366ff;">
                      <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                      <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 500;">${name}</p>
                    </div>
                  </div>
                  
                  <div style="flex: 1; min-width: 200px;">
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
                      <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                      <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 500;">
                        <a href="mailto:${email}" style="color: #3366ff; text-decoration: none;">${email}</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                ${organisation ? `
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 15px;">
                  <strong style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Organisation</strong>
                  <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 500;">${organisation}</p>
                </div>
                ` : ''}
              </div>
              
              <!-- Message -->
              <div style="margin-bottom: 30px;">
                <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Message</h2>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
                  <p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: Website Contact Form" 
                   style="display: inline-block; background: linear-gradient(135deg, #3366ff 0%, #2952cc 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(51, 102, 255, 0.3);">
                  Reply to ${name}
                </a>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This message was sent from the <strong>Protec Solutions</strong> website contact form<br>
                <span style="color: #9ca3af;">Received on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Perth' })}</span>
              </p>
            </div>
            
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    console.log('Sending email to spkarthigeyan@gmail.com');
    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: 'website@protecsolutions.com.au',
        to: ['spkarthigeyan@gmail.com'],
        subject: 'New Message from Website Contact Form',
        html: htmlBody,
        reply_to: email,
      });
      
      console.log('Email sent successfully:', emailResponse.data?.id);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email', 
          details: emailError.message 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (emailResponse.error) {
      console.error('Resend API error:', emailResponse.error);
      return new Response(
        JSON.stringify({ 
          error: 'Email delivery failed', 
          details: emailResponse.error 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Success response
    console.log('Contact form submission processed successfully');
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your message has been sent successfully! We will get back to you within 24 hours.',
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Contact form processing error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: 'Something went wrong. Please try again or contact us directly at contactus@protecsolutions.com.au' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});