// Feature: talencee-landing-clone, Property 32: Schema validation enforcement
const mongoose = require('mongoose');
const fc = require('fast-check');
const Content = require('../Content');
const Job = require('../Job');
const Application = require('../Application');

// WHY: Mock MongoDB connection for testing without actual database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/talencee-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Schema Validation Property Tests', () => {
  
  describe('Job Model Validation', () => {
    // WHY: Test that missing required fields are rejected
    it('should reject jobs with missing required fields', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            title: fc.option(fc.string(), { nil: undefined }),
            location: fc.option(fc.string(), { nil: undefined }),
            type: fc.option(fc.constantFrom('Full-time', 'Part-time', 'Contract', 'Internship'), { nil: undefined }),
            description: fc.option(fc.string(), { nil: undefined }),
            requirements: fc.option(fc.array(fc.string()), { nil: undefined })
          }),
          async (jobData) => {
            // WHY: Only test invalid data (at least one field missing)
            const hasAllFields = jobData.title && jobData.location && jobData.type && 
                                jobData.description && jobData.requirements && jobData.requirements.length > 0;
            
            if (hasAllFields) return true;
            
            const job = new Job(jobData);
            
            try {
              await job.validate();
              // WHY: If validation passes with missing fields, test fails
              return false;
            } catch (error) {
              // WHY: Validation should fail for invalid data
              return error.name === 'ValidationError';
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    // WHY: Test that invalid job types are rejected
    it('should reject jobs with invalid type enum values', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string().filter(s => !['Full-time', 'Part-time', 'Contract', 'Internship'].includes(s)),
          async (invalidType) => {
            const job = new Job({
              title: 'Test Job',
              location: 'Test Location',
              type: invalidType,
              description: 'Test Description',
              requirements: ['Requirement 1']
            });
            
            try {
              await job.validate();
              return false;
            } catch (error) {
              return error.name === 'ValidationError';
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Application Model Validation', () => {
    // WHY: Test that invalid email formats are rejected
    it('should reject applications with invalid email format', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string().filter(s => !s.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)),
          async (invalidEmail) => {
            const application = new Application({
              name: 'Test User',
              email: invalidEmail,
              subject: 'Test Subject',
              message: 'Test Message',
              resumePath: '/uploads/test.pdf'
            });
            
            try {
              await application.validate();
              return false;
            } catch (error) {
              return error.name === 'ValidationError';
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    // WHY: Test that missing required fields are rejected
    it('should reject applications with missing required fields', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            name: fc.option(fc.string(), { nil: undefined }),
            email: fc.option(fc.emailAddress(), { nil: undefined }),
            subject: fc.option(fc.string(), { nil: undefined }),
            message: fc.option(fc.string(), { nil: undefined }),
            resumePath: fc.option(fc.string(), { nil: undefined })
          }),
          async (appData) => {
            const hasAllFields = appData.name && appData.email && appData.subject && 
                                appData.message && appData.resumePath;
            
            if (hasAllFields) return true;
            
            const application = new Application(appData);
            
            try {
              await application.validate();
              return false;
            } catch (error) {
              return error.name === 'ValidationError';
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Content Model Validation', () => {
    // WHY: Test that missing required hero fields are rejected
    it('should reject content with missing hero fields', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            title: fc.option(fc.string(), { nil: undefined }),
            subtitle: fc.option(fc.string(), { nil: undefined }),
            buttonText: fc.option(fc.string(), { nil: undefined })
          }),
          async (heroData) => {
            const hasAllFields = heroData.title && heroData.subtitle && heroData.buttonText;
            
            if (hasAllFields) return true;
            
            const content = new Content({
              hero: heroData,
              services: [],
              features: [],
              testimonials: [],
              footer: {
                links: [],
                social: [],
                copyright: 'Test'
              },
              cta: {
                buttonText: 'Apply',
                modalTitle: 'Application'
              }
            });
            
            try {
              await content.validate();
              return false;
            } catch (error) {
              return error.name === 'ValidationError';
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
