// Feature: talencee-landing-clone, Property 19: Application field validation
// Feature: talencee-landing-clone, Property 23: Resume path persistence
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const fc = require('fast-check');
const path = require('path');
const fs = require('fs');
const Application = require('../../models/Application');
const applicationRoutes = require('../../routes/applicationRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/applications', applicationRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/talencee-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Application.deleteMany({});
  
  // WHY: Clean up uploaded test files
  const uploadDir = process.env.UPLOAD_DIR || './uploads';
  if (fs.existsSync(uploadDir)) {
    const files = fs.readdirSync(uploadDir);
    files.forEach(file => {
      if (file !== '.gitkeep') {
        fs.unlinkSync(path.join(uploadDir, file));
      }
    });
  }
});

describe('Application Submission Property Tests', () => {
  
  describe('Application Field Validation', () => {
    // WHY: Test that missing required fields are rejected
    it('should reject applications with missing required fields', async () => {
      const testFilePath = path.join(__dirname, 'test.pdf');
      fs.writeFileSync(testFilePath, Buffer.from('test content'));
      
      try {
        const testCases = [
          { email: 'test@example.com', subject: 'Test', message: 'Test message' }, // missing name
          { name: 'Test', subject: 'Test', message: 'Test message' }, // missing email
          { name: 'Test', email: 'test@example.com', message: 'Test message' }, // missing subject
          { name: 'Test', email: 'test@example.com', subject: 'Test' }, // missing message
        ];
        
        for (const testData of testCases) {
          const response = await request(app)
            .post('/api/applications')
            .field('name', testData.name || '')
            .field('email', testData.email || '')
            .field('subject', testData.subject || '')
            .field('message', testData.message || '')
            .attach('resume', testFilePath);
          
          // WHY: Verify validation fails with 400 status
          expect(response.status).toBe(400);
          expect(response.body.success).toBe(false);
        }
      } finally {
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      }
    });

    // WHY: Test that invalid email formats are rejected
    it('should reject applications with invalid email format', async () => {
      const testFilePath = path.join(__dirname, 'test.pdf');
      fs.writeFileSync(testFilePath, Buffer.from('test content'));
      
      try {
        const invalidEmails = ['invalid', 'test@', '@test.com', 'test.com'];
        
        for (const invalidEmail of invalidEmails) {
          const response = await request(app)
            .post('/api/applications')
            .field('name', 'Test User')
            .field('email', invalidEmail)
            .field('subject', 'Test Subject')
            .field('message', 'Test message with enough characters')
            .attach('resume', testFilePath);
          
          expect(response.status).toBe(400);
          expect(response.body.success).toBe(false);
        }
      } finally {
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      }
    });

    // WHY: Test that applications without resume are rejected
    it('should reject applications without resume file', async () => {
      const response = await request(app)
        .post('/api/applications')
        .field('name', 'Test User')
        .field('email', 'test@example.com')
        .field('subject', 'Test Subject')
        .field('message', 'Test message with enough characters');
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Resume');
    });
  });

  describe('Resume Path Persistence', () => {
    // WHY: Test that resume path is saved in database
    it('should save resume path in Application document', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            name: fc.string({ minLength: 2, maxLength: 100 }),
            email: fc.emailAddress(),
            subject: fc.string({ minLength: 3, maxLength: 200 }),
            message: fc.string({ minLength: 10, maxLength: 500 })
          }),
          async (appData) => {
            const testFilePath = path.join(__dirname, 'test.pdf');
            fs.writeFileSync(testFilePath, Buffer.from('test content'));
            
            try {
              const response = await request(app)
                .post('/api/applications')
                .field('name', appData.name)
                .field('email', appData.email)
                .field('subject', appData.subject)
                .field('message', appData.message)
                .attach('resume', testFilePath);
              
              if (response.status === 201) {
                // WHY: Fetch application from database
                const application = await Application.findById(response.body.data.id);
                
                // WHY: Verify resumePath field exists and points to a file
                return application && 
                       application.resumePath && 
                       typeof application.resumePath === 'string' &&
                       application.resumePath.includes('uploads');
              }
              
              return false;
            } finally {
              if (fs.existsSync(testFilePath)) {
                fs.unlinkSync(testFilePath);
              }
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    // WHY: Test that uploaded file exists at the saved path
    it('should have uploaded file at the saved resumePath', async () => {
      const testFilePath = path.join(__dirname, 'test.pdf');
      fs.writeFileSync(testFilePath, Buffer.from('test content'));
      
      try {
        const response = await request(app)
          .post('/api/applications')
          .field('name', 'Test User')
          .field('email', 'test@example.com')
          .field('subject', 'Test Subject')
          .field('message', 'Test message with enough characters')
          .attach('resume', testFilePath);
        
        expect(response.status).toBe(201);
        
        const application = await Application.findById(response.body.data.id);
        
        // WHY: Verify file exists at the saved path
        expect(fs.existsSync(application.resumePath)).toBe(true);
      } finally {
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      }
    });
  });

  describe('Successful Application Submission', () => {
    // WHY: Test that valid applications are accepted
    it('should accept valid applications with all required fields', async () => {
      const testFilePath = path.join(__dirname, 'test.pdf');
      fs.writeFileSync(testFilePath, Buffer.from('test content'));
      
      try {
        const response = await request(app)
          .post('/api/applications')
          .field('name', 'Test User')
          .field('email', 'test@example.com')
          .field('subject', 'Test Subject')
          .field('message', 'Test message with enough characters')
          .attach('resume', testFilePath);
        
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe('Test User');
      } finally {
        if (fs.existsSync(testFilePath)) {
          fs.unlinkSync(testFilePath);
        }
      }
    });
  });
});
