// Feature: talencee-landing-clone, Property 33: Automatic timestamp creation
const mongoose = require('mongoose');
const fc = require('fast-check');
const Job = require('../Job');
const Application = require('../Application');

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
  await Job.deleteMany({});
  await Application.deleteMany({});
});

describe('Automatic Timestamp Property Tests', () => {
  
  describe('Job Model Timestamps', () => {
    // WHY: Test that createdAt is automatically set when creating a job
    it('should automatically set createdAt timestamp for new jobs', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            title: fc.string({ minLength: 1 }),
            location: fc.string({ minLength: 1 }),
            type: fc.constantFrom('Full-time', 'Part-time', 'Contract', 'Internship'),
            description: fc.string({ minLength: 1 }),
            requirements: fc.array(fc.string({ minLength: 1 }), { minLength: 1 })
          }),
          async (jobData) => {
            const beforeCreate = new Date();
            
            const job = new Job(jobData);
            await job.save();
            
            const afterCreate = new Date();
            
            // WHY: Verify createdAt exists and is within expected time range
            return job.createdAt instanceof Date &&
                   job.createdAt >= beforeCreate &&
                   job.createdAt <= afterCreate;
          }
        ),
        { numRuns: 50 }
      );
    });

    // WHY: Test that updatedAt is automatically set when creating a job
    it('should automatically set updatedAt timestamp for new jobs', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            title: fc.string({ minLength: 1 }),
            location: fc.string({ minLength: 1 }),
            type: fc.constantFrom('Full-time', 'Part-time', 'Contract', 'Internship'),
            description: fc.string({ minLength: 1 }),
            requirements: fc.array(fc.string({ minLength: 1 }), { minLength: 1 })
          }),
          async (jobData) => {
            const job = new Job(jobData);
            await job.save();
            
            // WHY: Verify updatedAt exists and is a valid date
            return job.updatedAt instanceof Date;
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Application Model Timestamps', () => {
    // WHY: Test that createdAt is automatically set when creating an application
    it('should automatically set createdAt timestamp for new applications', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            name: fc.string({ minLength: 1 }),
            email: fc.emailAddress(),
            subject: fc.string({ minLength: 1 }),
            message: fc.string({ minLength: 1 }),
            resumePath: fc.string({ minLength: 1 })
          }),
          async (appData) => {
            const beforeCreate = new Date();
            
            const application = new Application(appData);
            await application.save();
            
            const afterCreate = new Date();
            
            // WHY: Verify createdAt exists and is within expected time range
            return application.createdAt instanceof Date &&
                   application.createdAt >= beforeCreate &&
                   application.createdAt <= afterCreate;
          }
        ),
        { numRuns: 50 }
      );
    });

    // WHY: Test that updatedAt is automatically set when creating an application
    it('should automatically set updatedAt timestamp for new applications', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            name: fc.string({ minLength: 1 }),
            email: fc.emailAddress(),
            subject: fc.string({ minLength: 1 }),
            message: fc.string({ minLength: 1 }),
            resumePath: fc.string({ minLength: 1 })
          }),
          async (appData) => {
            const application = new Application(appData);
            await application.save();
            
            // WHY: Verify updatedAt exists and is a valid date
            return application.updatedAt instanceof Date;
          }
        ),
        { numRuns: 50 }
      );
    });
  });
});
