// Feature: talencee-landing-clone, Property 18: Job retrieval by ID
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const fc = require('fast-check');
const Job = require('../../models/Job');
const jobRoutes = require('../../routes/jobRoutes');

const app = express();
app.use(express.json());
app.use('/api/jobs', jobRoutes);

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
});

describe('Job Retrieval Property Tests', () => {
  
  // WHY: Test that valid job IDs return the correct job
  it('should return correct job for valid IDs', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          location: fc.string({ minLength: 1, maxLength: 100 }),
          type: fc.constantFrom('Full-time', 'Part-time', 'Contract', 'Internship'),
          description: fc.string({ minLength: 1, maxLength: 500 }),
          requirements: fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 })
        }),
        async (jobData) => {
          // WHY: Create a job in the database
          const createdJob = await Job.create(jobData);
          
          // WHY: Fetch the job by ID
          const response = await request(app)
            .get(`/api/jobs/${createdJob._id}`);
          
          // WHY: Verify correct job is returned
          return response.status === 200 &&
                 response.body.success === true &&
                 response.body.data._id === createdJob._id.toString() &&
                 response.body.data.title === jobData.title;
        }
      ),
      { numRuns: 50 }
    );
  });

  // WHY: Test that non-existent IDs return 404
  it('should return 404 for non-existent job IDs', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(
          new mongoose.Types.ObjectId(),
          new mongoose.Types.ObjectId(),
          new mongoose.Types.ObjectId()
        ),
        async (nonExistentId) => {
          const response = await request(app)
            .get(`/api/jobs/${nonExistentId}`);
          
          // WHY: Verify 404 response for non-existent jobs
          return response.status === 404 &&
                 response.body.success === false;
        }
      ),
      { numRuns: 50 }
    );
  });

  // WHY: Test that invalid ID formats return 404
  it('should return 404 for invalid ID formats', async () => {
    const invalidIds = ['invalid', '123', 'not-an-id', ''];
    
    for (const invalidId of invalidIds) {
      const response = await request(app)
        .get(`/api/jobs/${invalidId}`);
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    }
  });

  // WHY: Test that getAllJobs returns all created jobs
  it('should return all jobs when fetching job list', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            title: fc.string({ minLength: 1, maxLength: 100 }),
            location: fc.string({ minLength: 1, maxLength: 100 }),
            type: fc.constantFrom('Full-time', 'Part-time', 'Contract', 'Internship'),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            requirements: fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 })
          }),
          { minLength: 1, maxLength: 5 }
        ),
        async (jobsData) => {
          // WHY: Create multiple jobs
          await Job.insertMany(jobsData);
          
          // WHY: Fetch all jobs
          const response = await request(app)
            .get('/api/jobs');
          
          // WHY: Verify all jobs are returned
          return response.status === 200 &&
                 response.body.success === true &&
                 response.body.count === jobsData.length;
        }
      ),
      { numRuns: 30 }
    );
  });
});
