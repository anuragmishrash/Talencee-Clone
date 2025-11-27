require('dotenv').config();
const mongoose = require('mongoose');
const Content = require('../models/Content');
const Job = require('../models/Job');

// WHY: Seed script to populate database with initial data
const seedDatabase = async () => {
  try {
    // WHY: Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');

    // WHY: Clear existing data
    await Content.deleteMany({});
    await Job.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // WHY: Create initial content with Indian context
    const content = await Content.create({
      hero: {
        title: 'Join Talencee India - Where Talent Meets Opportunity',
        subtitle: 'Build your career with India\'s fastest-growing tech company. Explore exciting roles across Bengaluru, Hyderabad, Pune, and more',
        buttonText: 'Explore Openings'
      },
      services: [
        {
          title: 'Competitive Packages',
          description: 'Industry-leading CTCs ranging from ₹8 LPA to ₹35 LPA for experienced professionals, with attractive ESOPs and performance bonuses.',
          icon: '💰'
        },
        {
          title: 'Work-Life Balance',
          description: 'Flexible work options including Remote, Hybrid, and Onsite roles. Choose what works best for you and your family.',
          icon: '⚖️'
        },
        {
          title: 'Growth & Learning',
          description: 'Continuous upskilling programs, mentorship from industry leaders, and clear career progression paths.',
          icon: '📈'
        }
      ],
      features: [
        {
          title: 'Pan-India Presence',
          description: 'Offices in Bengaluru, Hyderabad, Gurugram, Pune, Mumbai, Chennai, and Noida with world-class infrastructure.',
          icon: '🇮🇳'
        },
        {
          title: 'Fast Hiring Process',
          description: 'Get hired in just 3 rounds - HR Screening, Technical Assessment, and Final Discussion. Offers within 7-10 days.',
          icon: '⚡'
        },
        {
          title: 'Amazing Perks',
          description: 'Health insurance for family, annual trips, wellness programs, free meals, and much more.',
          icon: '🎁'
        }
      ],
      testimonials: [
        {
          name: 'Aayush Patel',
          role: 'Senior Software Engineer, Bengaluru',
          message: 'Talencee gave me the perfect platform to grow my career. The work culture is amazing and the CTC package exceeded my expectations!',
          avatar: ''
        },
        {
          name: 'Riya Sharma',
          role: 'Product Manager, Hyderabad',
          message: 'Best decision of my career! The team is supportive, projects are challenging, and the hybrid work model is perfect for work-life balance.',
          avatar: ''
        },
        {
          name: 'Arjun Mehta',
          role: 'UI/UX Designer, Pune',
          message: 'Joined as a fresher and grew to Senior Designer in 2 years. Talencee truly invests in employee growth and development.',
          avatar: ''
        }
      ],
      footer: {
        links: [
          { text: 'About Talencee India', url: '#' },
          { text: 'Current Openings', url: '#jobs-section' },
          { text: 'Life at Talencee', url: '#' },
          { text: 'Privacy Policy', url: '#' }
        ],
        social: [
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/talencee/' },
          { platform: 'Instagram', url: 'https://www.instagram.com/talencee/' }
        ],
        copyright: '© 2024 Talencee India Pvt. Ltd. All rights reserved. | CIN: U72900KA2020PTC123456'
      },
      cta: {
        buttonText: 'Apply Now',
        modalTitle: 'Join Talencee India - Apply Today'
      }
    });

    console.log('✅ Created initial content');

    // WHY: Create Indian job listings with detailed information
    const jobs = await Job.insertMany([
      {
        title: 'Senior Full Stack Developer',
        location: 'Bengaluru, Karnataka',
        type: 'Full-time',
        ctc: '₹18-25 LPA',
        experience: '4-7 years',
        workMode: 'Hybrid',
        description: 'Join Talencee India as a Senior Full Stack Developer and work on cutting-edge products that impact millions of users across India. You\'ll be part of our core engineering team building scalable, high-performance web applications using modern tech stack.',
        companyOverview: 'Talencee India is a rapidly growing technology company revolutionizing the recruitment and talent management space in India. With offices across major metros and a team of 500+ professionals, we\'re building the future of work.',
        responsibilities: [
          'Design and develop scalable full-stack applications using React, Node.js, and MongoDB',
          'Lead technical discussions and mentor junior developers',
          'Collaborate with product managers and designers to deliver high-quality features',
          'Optimize application performance and ensure code quality through reviews',
          'Participate in architecture decisions and technology evaluations'
        ],
        requirements: [
          '4-7 years of hands-on experience in full stack development',
          'Strong proficiency in React.js, Node.js, Express.js, and MongoDB',
          'Experience with cloud platforms (AWS/Azure) and microservices architecture',
          'Excellent problem-solving skills and ability to work in agile teams',
          'B.Tech/M.Tech in Computer Science or equivalent'
        ],
        perks: [
          'Health insurance for self, spouse, parents, and children',
          'Flexible work hours with hybrid model (3 days office, 2 days WFH)',
          'Annual performance bonuses and ESOPs',
          'Learning budget of ₹50,000 per year',
          'Free meals, gym membership, and wellness programs',
          'Annual company retreat and team outings'
        ],
        hiringProcess: [
          'HR Screening (30 mins) - Culture fit and background verification',
          'Technical Round 1 (90 mins) - DSA and system design',
          'Technical Round 2 (60 mins) - Live coding and project discussion',
          'Managerial Round (45 mins) - Leadership and behavioral assessment',
          'HR Discussion (30 mins) - Offer discussion and onboarding'
        ]
      },
      {
        title: 'Product Manager',
        location: 'Gurugram, Haryana',
        type: 'Full-time',
        ctc: '₹22-32 LPA',
        experience: '3-6 years',
        workMode: 'Onsite',
        description: 'Drive product strategy and execution for Talencee\'s flagship products. Work with cross-functional teams to build products that delight users and drive business growth.',
        companyOverview: 'Talencee India is a rapidly growing technology company revolutionizing the recruitment and talent management space in India. With offices across major metros and a team of 500+ professionals, we\'re building the future of work.',
        responsibilities: [
          'Define product roadmap and prioritize features based on user needs and business goals',
          'Work closely with engineering, design, and business teams to deliver products',
          'Conduct user research, analyze metrics, and make data-driven decisions',
          'Create detailed PRDs, user stories, and acceptance criteria',
          'Lead product launches and coordinate with marketing for GTM strategy'
        ],
        requirements: [
          '3-6 years of product management experience in B2B/B2C tech products',
          'Strong analytical skills with experience in SQL, analytics tools (Mixpanel, GA)',
          'Excellent communication and stakeholder management abilities',
          'Experience with Agile/Scrum methodologies',
          'MBA from tier-1 institute or equivalent experience preferred'
        ],
        perks: [
          'Comprehensive health insurance with zero co-pay',
          'Stock options (ESOPs) with 4-year vesting',
          'Quarterly performance bonuses',
          'MacBook Pro and premium work setup',
          'Sponsored certifications and conferences',
          'Relocation assistance if needed'
        ],
        hiringProcess: [
          'HR Screening (30 mins)',
          'Product Case Study (Take-home assignment)',
          'Product Round (90 mins) - Case discussion and product thinking',
          'Leadership Round (60 mins) - Strategic thinking and culture fit',
          'Final Discussion (30 mins) - Offer and expectations'
        ]
      },
      {
        title: 'UI/UX Designer',
        location: 'Pune, Maharashtra',
        type: 'Full-time',
        ctc: '₹12-18 LPA',
        experience: '2-5 years',
        workMode: 'Remote',
        description: 'Create beautiful, intuitive user experiences for Talencee\'s products. Join our design team and shape how millions of users interact with our platform.',
        companyOverview: 'Talencee India is a rapidly growing technology company revolutionizing the recruitment and talent management space in India. With offices across major metros and a team of 500+ professionals, we\'re building the future of work.',
        responsibilities: [
          'Design user interfaces for web and mobile applications',
          'Conduct user research and usability testing',
          'Create wireframes, prototypes, and high-fidelity designs',
          'Maintain and evolve the design system',
          'Collaborate with developers to ensure pixel-perfect implementation'
        ],
        requirements: [
          '2-5 years of UI/UX design experience',
          'Expert in Figma, Adobe XD, or Sketch',
          'Strong portfolio showcasing end-to-end design projects',
          'Understanding of design principles, typography, and color theory',
          'Experience with design systems and component libraries'
        ],
        perks: [
          'Work from anywhere in India',
          'Latest design tools and software licenses',
          'Health insurance and wellness benefits',
          'Annual design conference sponsorship',
          'Flexible working hours',
          'Home office setup allowance of ₹50,000'
        ],
        hiringProcess: [
          'Portfolio Review',
          'Design Challenge (Take-home)',
          'Design Round (90 mins) - Portfolio discussion and design thinking',
          'Team Fit Round (45 mins)',
          'Offer Discussion'
        ]
      },
      {
        title: 'Marketing Intern',
        location: 'Hyderabad, Telangana',
        type: 'Internship',
        ctc: 'Stipend: ₹15,000/month',
        experience: '0-1 years',
        workMode: 'Hybrid',
        description: '6-month internship program for aspiring marketers. Get hands-on experience in digital marketing, content creation, social media, and campaign management.',
        companyOverview: 'Talencee India is a rapidly growing technology company revolutionizing the recruitment and talent management space in India. With offices across major metros and a team of 500+ professionals, we\'re building the future of work.',
        responsibilities: [
          'Assist in creating content for social media, blogs, and email campaigns',
          'Support digital marketing campaigns across channels',
          'Conduct market research and competitor analysis',
          'Help organize events and webinars',
          'Track and report campaign performance metrics'
        ],
        requirements: [
          'Currently pursuing or recently completed degree in Marketing, Communications, or related field',
          'Strong writing and communication skills in English and Hindi',
          'Familiarity with social media platforms (LinkedIn, Instagram, Twitter)',
          'Creative mindset with attention to detail',
          'Basic knowledge of Canva, Google Analytics is a plus'
        ],
        perks: [
          'Stipend of ₹15,000 per month',
          'Certificate of completion',
          'Potential for full-time conversion (PPO)',
          'Mentorship from senior marketers',
          'Free lunch and snacks',
          'Flexible internship hours'
        ],
        hiringProcess: [
          'Application Review',
          'HR Screening (20 mins)',
          'Assignment (Content writing/Social media)',
          'Final Interview (30 mins)',
          'Offer Letter'
        ]
      },
      {
        title: 'Data Scientist',
        location: 'Noida, Uttar Pradesh',
        type: 'Full-time',
        ctc: '₹20-30 LPA',
        experience: '3-6 years',
        workMode: 'Hybrid',
        description: 'Join our Data Science team to build ML models and extract insights that drive business decisions. Work on challenging problems in recruitment analytics and talent intelligence.',
        companyOverview: 'Talencee India is a rapidly growing technology company revolutionizing the recruitment and talent management space in India. With offices across major metros and a team of 500+ professionals, we\'re building the future of work.',
        responsibilities: [
          'Build and deploy machine learning models for talent matching and predictions',
          'Analyze large datasets to extract actionable insights',
          'Develop recommendation systems and NLP models',
          'Collaborate with engineering to productionize ML models',
          'Present findings to stakeholders and leadership'
        ],
        requirements: [
          'M.Tech/PhD in Data Science, Statistics, Computer Science, or related field',
          'Strong programming skills in Python with libraries like Pandas, NumPy, Scikit-learn',
          'Experience with ML frameworks (TensorFlow, PyTorch, or Keras)',
          'Knowledge of SQL and experience with big data tools (Spark, Hadoop)',
          'Excellent analytical and problem-solving abilities'
        ],
        perks: [
          'Competitive CTC with annual bonuses',
          'Access to GPU clusters and cloud resources',
          'Conference and research paper publication support',
          'Health insurance with mental wellness coverage',
          'Hybrid work model (3 days office)',
          'Learning budget for courses and certifications'
        ],
        hiringProcess: [
          'HR Screening (30 mins)',
          'Technical Assignment (Take-home ML problem)',
          'Technical Round (90 mins) - ML concepts and assignment discussion',
          'Leadership Round (60 mins)',
          'Offer Discussion'
        ]
      },
      {
        title: 'DevOps Engineer',
        location: 'Chennai, Tamil Nadu',
        type: 'Full-time',
        ctc: '₹15-22 LPA',
        experience: '3-5 years',
        workMode: 'Onsite',
        description: 'Build and maintain robust CI/CD pipelines, manage cloud infrastructure, and ensure high availability of Talencee\'s platform serving millions of users.',
        companyOverview: 'Talencee India is a rapidly growing technology company revolutionizing the recruitment and talent management space in India. With offices across major metros and a team of 500+ professionals, we\'re building the future of work.',
        responsibilities: [
          'Design and implement CI/CD pipelines using Jenkins, GitLab CI, or GitHub Actions',
          'Manage AWS/Azure infrastructure using Terraform and CloudFormation',
          'Monitor system performance and implement auto-scaling solutions',
          'Ensure security compliance and implement best practices',
          'Troubleshoot production issues and minimize downtime'
        ],
        requirements: [
          '3-5 years of DevOps/SRE experience',
          'Strong knowledge of AWS/Azure services (EC2, S3, RDS, Lambda, etc.)',
          'Experience with Docker, Kubernetes, and container orchestration',
          'Proficiency in scripting (Python, Bash, or PowerShell)',
          'Understanding of networking, security, and monitoring tools'
        ],
        perks: [
          'Health insurance for family',
          'AWS/Azure certification sponsorship',
          'Performance bonuses',
          'Latest tech gadgets and tools',
          'Team outings and events',
          'Relocation support available'
        ],
        hiringProcess: [
          'HR Screening (30 mins)',
          'Technical Round 1 (90 mins) - DevOps concepts and scenario-based questions',
          'Technical Round 2 (60 mins) - Live troubleshooting exercise',
          'Managerial Round (45 mins)',
          'Offer Discussion'
        ]
      }
    ]);

    console.log(`✅ Created ${jobs.length} sample jobs`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// WHY: Run seed function
seedDatabase();
