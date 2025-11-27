# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env):**
The `.env` file is already created with MongoDB Atlas connection. Update these fields:
- `SMTP_USER` - Your Gmail address
- `SMTP_PASS` - Your Gmail app password (not regular password)
- `HR_EMAIL` - Email where applications will be sent

**Frontend (.env):**
Already configured to connect to `http://localhost:5000`

### Step 3: Seed the Database

```bash
cd backend
npm run seed
```

This will populate your database with:
- Sample website content
- 5 job listings
- All necessary data structures

### Step 4: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on: http://localhost:3000

### Step 5: Access the Application

- **Landing Page**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
  - API Key: `talencee-admin-2024-secure-key`

## 📧 Setting Up Gmail SMTP

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
4. Use this password in your `.env` file as `SMTP_PASS`

## ✅ Verify Everything Works

1. **Landing Page**: Should display hero, services, features, testimonials, and jobs
2. **Job Listings**: Click on any job to see details
3. **Apply**: Click "Apply Now" and submit an application with a resume
4. **Admin Panel**: Login and edit content, then save changes
5. **Email**: Check that HR receives application emails

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Verify the MONGO_URI in `.env` is correct
- Check your internet connection

**Email Not Sending:**
- Verify SMTP credentials are correct
- Check that Gmail app password is used (not regular password)
- Ensure 2FA is enabled on Gmail account

**Port Already in Use:**
- Change PORT in backend `.env` to 5001 or another port
- Update VITE_API_URL in frontend `.env` accordingly

**File Upload Error:**
- Ensure `uploads` folder exists in backend directory
- Check file size is under 5MB
- Verify file type is PDF or DOC

## 🎯 Next Steps

1. Customize the content through the admin panel
2. Add your own job listings via MongoDB
3. Update styling in Tailwind config
4. Configure production SMTP service
5. Deploy to production (see README.md)

## 📚 Additional Resources

- Full documentation: See README.md
- API documentation: See README.md API section
- Deployment guide: See README.md Deployment section

---

**Need Help?** Check the main README.md for detailed documentation.
