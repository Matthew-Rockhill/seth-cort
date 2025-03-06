// api/contact.js

// Install SendGrid with: npm install @sendgrid/mail
import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get form data from request body
    const { name, email, subject, message } = req.body;
    
    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    // Set up email data
    const msg = {
      to: ['Seth.cort.bookings@gmail.com', 'mrockhill@gmail.com'],
      from: process.env.VERIFIED_SENDER_EMAIL, // Must be verified in SendGrid
      subject: subject ? `${subject} - Contact Form Submission` : `New message from ${name} - Contact Form`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      `,
      replyTo: email,
    };
    
    // Send the email
    await sgMail.send(msg);
    
    // Return success response
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again later.',
      details: error.response ? error.response.body : null
    });
  }
}