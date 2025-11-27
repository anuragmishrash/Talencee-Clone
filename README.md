# Talencee India - Job Portal

A modern, full-stack MERN job portal for Talencee India with dynamic content management, job listings, application system, and beautiful animations.

## 🚀 Features

- **Dynamic Landing Page** with animated hero section, services, features, and testimonials
- **Job Listings** with advanced search and filters (location, job type, work mode)
- **Detailed Job Pages** with responsibilities, requirements, perks, and hiring process
- **Application System** with resume upload (PDF/DOC, 5MB limit)
- **Email Notifications** via SMTP for applicants and HR
- **Admin CMS** for managing content dynamically
- **Additional Pages**: About, Life at Talencee, Privacy Policy, Contact
- **Custom Animated Cursor** with orange gradient
- **Fully Responsive** design with Tailwind CSS
- **Smooth Animations** using Framer Motion

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (file uploads)
- Nodemailer (email)
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- SMTP credentials (Gmail, SendGrid, etc.)

### Local Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd talencee-india
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Configure environment variables**

Create `backend/.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_API_KEY=talencee-admin-2024-secure-key
```

Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Seed the database**
```bash
cd backend
npm run seed
```

5. **Run the application**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

## 🌐 Deployment

### Frontend (Vercel)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure:
  - Framework Preset: Vite
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Environment Variables:
    - `VITE_API_URL`: Your Render backend URL

3. **Deploy**

### Backend (Render)

1. **Create Web Service on Render**
- Go to [render.com](https://render.com)
- New → Web Service
- Connect your GitHub repository
- Configure:
  - Name: `talencee-backend`
  - Root Directory: `backend`
  - Environment: Node
  - Build Command: `npm install`
  - Start Command: `npm start`

2. **Add Environment Variables**
```
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your-email>
SMTP_PASS=<your-app-password>
ADMIN_API_KEY=talencee-admin-2024-secure-key
```

3. **Deploy**

4. **Seed Database** (one-time)
- Go to Render Dashboard → Shell
- Run: `npm run seed`

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Add database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string and add to `MONGO_URI`

## 📧 SMTP Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: Google Account → Security → App Passwords
3. Use app password in `SMTP_PASS`

### Alternative SMTP Providers
- SendGrid
- Mailgun
- AWS SES

## 🔑 Admin Access

- URL: `/admin`
- API Key: `talencee-admin-2024-secure-key` (change in production)

## 📁 Project Structure

```
talencee-india/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth, validation, error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Database seeding
│   ├── services/        # Email service
│   ├── uploads/         # Resume uploads
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app component
│   └── index.html
├── .gitignore
├── README.md
└── SETUP_GUIDE.md
```

## 🎨 Key Features Explained

### Custom Cursor
- Orange-to-red gradient for brand visibility
- Smooth animations following mouse movement
- Hover effects on interactive elements

### Job Search & Filters
- Real-time search by job title/keywords
- Filter by location (Indian cities)
- Filter by job type (Full-time, Internship, etc.)
- Filter by work mode (Onsite, Remote, Hybrid)

### Application System
- Resume upload with validation
- Email notifications to applicant and HR
- Form validation with error messages

### Admin CMS
- Update hero section content
- Manage services and features
- Edit testimonials
- Update footer content

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port in .env
PORT=5001
```

### MongoDB Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has correct permissions

### Email Not Sending
- Verify SMTP credentials
- Check Gmail app password (not regular password)
- Enable "Less secure app access" if needed

## 📝 License

This project is for educational/portfolio purposes.

## 👨‍💻 Author

Built with ❤️ using MERN Stack

## 🙏 Acknowledgments

- Talencee India for inspiration
- React, Node.js, and MongoDB communities
