// Feature: talencee-landing-clone, Property 27: Email content completeness
// Feature: talencee-landing-clone, Property 26: Email recipient correctness
// Feature: talencee-landing-clone, Property 30: Email failure resilience
const fc = require('fast-check');
const nodemailer = require('nodemailer');
const { sendApplicationEmail, sendAcknowledgmentEmail } = require('../emailService');

// WHY: Mock nodemailer to avoid sending real emails during tests
jest.mock('nodemailer');

describe('Email Service Property Tests', () => {
  let mockSendMail;
  let mockTransporter;
  
  beforeEach(() => {
    // WHY: Create mock sendMail function
    mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
    
    // WHY: Create mock transporter
    mockTransporter = {
      sendMail: mockSendMail
    };
    
    // WHY: Mock nodemailer.createTransport to return mock transporter
    nodemailer.createTransport.mockReturnValue(mockTransporter);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Email Content Completeness', () => {
    // WHY: Test that all applicant fields are included in email
    it('should include all applicant details in email body', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            name: fc.string({ minLength: 1, maxLength: 100 }),
            email: fc.emailAddress(),
            subject: fc.string({ minLength: 1, maxLength: 200 }),
            message: fc.string({ minLength: 10, maxLength: 500 })
          }),
          async (appData) => {
            await sendApplicationEmail(appData);
            
            // WHY: Verify sendMail was called
            expect(mockSendMail).toHaveBeenCalled();
            
            const mailOptions = mockSendMail.mock.calls[0][0];
            
            // WHY: Verify email has correct subject
            const hasCorrectSubject = mailOptions.subject === 'New Application Received';
            
            // WHY: Verify email body contains all applicant fields
            const bodyContainsName = mailOptions.text.includes(appData.name);
            const bodyContainsEmail = mailOptions.text.includes(appData.email);
            const bodyContainsSubject = mailOptions.text.includes(appData.subject);
            const bodyContainsMessage = mailOptions.text.includes(appData.message);
            
            return hasCorrectSubject && 
                   bodyContainsName && 
                   bodyContainsEmail && 
                   bodyContainsSubject && 
                   bodyContainsMessage;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Email Recipient Correctness', () => {
    // WHY: Test that emails are sent to HR_EMAIL from environment
    it('should send emails to HR_EMAIL address', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            name: fc.string({ minLength: 1 }),
            email: fc.emailAddress(),
            subject: fc.string({ minLength: 1 }),
            message: fc.string({ minLength: 1 })
          }),
          async (appData) => {
            await sendApplicationEmail(appData);
            
            const mailOptions = mockSendMail.mock.calls[0][0];
            
            // WHY: Verify recipient matches HR_EMAIL environment variable
            return mailOptions.to === process.env.HR_EMAIL;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Email Attachment', () => {
    // WHY: Test that resume is attached when provided
    it('should attach resume file when resumePath is provided', async () => {
      const appData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message'
      };
      
      const resumePath = './uploads/test-resume.pdf';
      
      await sendApplicationEmail(appData, resumePath);
      
      const mailOptions = mockSendMail.mock.calls[0][0];
      
      // WHY: Verify attachment is included
      expect(mailOptions.attachments).toBeDefined();
      expect(mailOptions.attachments.length).toBe(1);
      expect(mailOptions.attachments[0].path).toBe(resumePath);
    });

    // WHY: Test that no attachment is added when resumePath is null
    it('should not attach file when resumePath is null', async () => {
      const appData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message'
      };
      
      await sendApplicationEmail(appData, null);
      
      const mailOptions = mockSendMail.mock.calls[0][0];
      
      // WHY: Verify no attachment is included
      expect(mailOptions.attachments).toBeUndefined();
    });
  });

  describe('Email Failure Resilience', () => {
    // WHY: Test that email failures don't throw errors
    it('should handle email failures gracefully without throwing', async () => {
      // WHY: Mock sendMail to reject
      mockSendMail.mockRejectedValue(new Error('SMTP connection failed'));
      
      const appData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message'
      };
      
      // WHY: Function should not throw even when email fails
      const result = await sendApplicationEmail(appData);
      
      // WHY: Verify function returns failure status instead of throwing
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    // WHY: Test that function returns success when email sends
    it('should return success status when email sends successfully', async () => {
      const appData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message'
      };
      
      const result = await sendApplicationEmail(appData);
      
      expect(result.success).toBe(true);
      expect(result.messageId).toBeDefined();
    });
  });

  describe('SMTP Configuration', () => {
    // WHY: Test that SMTP is configured with environment variables
    it('should configure SMTP with environment variables', async () => {
      const appData = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test Message'
      };
      
      await sendApplicationEmail(appData);
      
      // WHY: Verify createTransport was called with correct config
      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    });
  });

  describe('Acknowledgment Email', () => {
    // WHY: Test that acknowledgment emails are sent to applicant
    it('should send acknowledgment email to applicant', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.emailAddress(),
          fc.string({ minLength: 1, maxLength: 100 }),
          async (email, name) => {
            await sendAcknowledgmentEmail(email, name);
            
            const mailOptions = mockSendMail.mock.calls[0][0];
            
            // WHY: Verify email is sent to applicant
            return mailOptions.to === email && 
                   mailOptions.text.includes(name);
          }
        ),
        { numRuns: 50 }
      );
    });
  });
});
