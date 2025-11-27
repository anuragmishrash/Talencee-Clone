const nodemailer = require('nodemailer');

// WHY: Create reusable transporter object using SMTP configuration
// This allows sending emails through configured SMTP server
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // WHY: Use TLS (true for 465, false for other ports)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false // WHY: Accept self-signed certificates
    },
    connectionTimeout: 10000, // WHY: 10 second timeout
    greetingTimeout: 10000,
    socketTimeout: 10000
  });
};

// WHY: Send application notification email to HR
// This notifies HR team when a new application is submitted
const sendApplicationEmail = async (applicationData, resumePath = null) => {
  try {
    const transporter = createTransporter();
    
    // WHY: Format job information if jobId is provided
    let jobInfo = 'General Application';
    if (applicationData.jobTitle) {
      jobInfo = `Job: ${applicationData.jobTitle}`;
    }
    
    // WHY: Construct email body with all applicant details
    const emailBody = `
      New Application Received
      
      Applicant Details:
      ------------------
      Name: ${applicationData.name}
      Email: ${applicationData.email}
      Subject: ${applicationData.subject}
      
      ${jobInfo}
      
      Message:
      ${applicationData.message}
      
      ------------------
      Application received at: ${new Date().toLocaleString()}
    `;
    
    // WHY: Configure email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.HR_EMAIL,
      subject: 'New Application Received',
      text: emailBody
    };
    
    // WHY: Attach resume file if provided
    if (resumePath) {
      mailOptions.attachments = [{
        filename: resumePath.split('/').pop(), // WHY: Extract filename from path
        path: resumePath
      }];
    }
    
    // WHY: Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Application email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    // WHY: Log error but don't throw - email failure shouldn't fail the application submission
    console.error('❌ Email sending failed:', error.message);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response
    });
    return { success: false, error: error.message };
  }
};

// WHY: Send acknowledgment email to applicant (optional)
// This provides confirmation to the applicant that their application was received
const sendAcknowledgmentEmail = async (applicantEmail, applicantName) => {
  try {
    const transporter = createTransporter();
    
    // WHY: Construct acknowledgment email body
    const emailBody = `
      Dear ${applicantName},
      
      Thank you for your application!
      
      We have received your application and our team will review it shortly.
      If your qualifications match our requirements, we will contact you for the next steps.
      
      Best regards,
      Talencee Team
    `;
    
    // WHY: Configure email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: applicantEmail,
      subject: 'Application Received - Talencee',
      text: emailBody
    };
    
    // WHY: Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Acknowledgment email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    // WHY: Log error but don't throw
    console.error('❌ Acknowledgment email failed:', error.message);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response
    });
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendApplicationEmail,
  sendAcknowledgmentEmail
};
