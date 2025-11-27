# 🚀 Quick Start Guide

## Deploy in 3 Steps

### Step 1: Push to GitHub (5 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/talencee-india.git
git push -u origin main
```

### Step 2: Deploy Backend on Render (15 min)
1. Go to https://render.com → New Web Service
2. Connect GitHub repo
3. Settings:
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add env vars (see below)
5. Deploy → Wait → Copy URL
6. Shell → Run: `npm run seed`

### Step 3: Deploy Frontend on Vercel (5 min)
1. Go to https://vercel.com → New Project
2. Import GitHub repo
3. Settings:
   - Framework: Vite
   - Root: `frontend`
   - Build: `npm run build`
   - Output: `dist`
4. Add env var: `VITE_API_URL=https://YOUR-BACKEND.onrender.com/api`
5. Deploy → Done!

## Environment Variables

### Backend (Render)
```
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/talencee
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
ADMIN_API_KEY=talencee-admin-2024-secure-key
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Prerequisites Setup

### MongoDB Atlas (10 min)
1. https://mongodb.com/cloud/atlas → Sign up
2. Create FREE cluster
3. Database Access → Add user
4. Network Access → Allow 0.0.0.0/0
5. Connect → Get connection string

### Gmail SMTP (5 min)
1. Google Account → Security
2. Enable 2-Factor Authentication
3. App Passwords → Generate for Mail
4. Copy 16-character password

## Test Your Deployment

✅ Frontend: https://your-project.vercel.app
✅ Backend: https://your-backend.onrender.com/api/health
✅ Admin: https://your-project.vercel.app/admin

## Need Help?

📖 Full Guide: Read **DEPLOYMENT.md**
✅ Checklist: See **PRE-DEPLOYMENT-CHECKLIST.md**
📚 Setup: Check **README.md**

---

**Total Time: ~25 minutes | Cost: $0/month**
