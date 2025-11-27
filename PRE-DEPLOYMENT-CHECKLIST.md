# Pre-Deployment Checklist ✅

## Before Pushing to GitHub

### 1. Environment Files
- [ ] `backend/.env` is in `.gitignore` ✅
- [ ] `backend/.env.example` exists with placeholder values ✅
- [ ] `frontend/.env` is in `.gitignore` ✅
- [ ] No sensitive data in code ✅

### 2. Dependencies
- [ ] Run `npm install` in backend ✅
- [ ] Run `npm install` in frontend ✅
- [ ] All dependencies in package.json ✅

### 3. Code Quality
- [ ] No console.errors in production code
- [ ] Remove debug console.logs (optional)
- [ ] All API endpoints working locally
- [ ] Test all pages load correctly

### 4. Documentation
- [ ] README.md is complete ✅
- [ ] DEPLOYMENT.md guide created ✅
- [ ] SETUP_GUIDE.md exists ✅

### 5. Git Setup
- [ ] `.gitignore` file created ✅
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repo
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push: `git push -u origin main`

## MongoDB Atlas Setup

- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP: 0.0.0.0/0
- [ ] Get connection string
- [ ] Test connection locally

## Gmail SMTP Setup

- [ ] Enable 2-Factor Authentication
- [ ] Generate App Password
- [ ] Test email sending locally
- [ ] Save credentials securely

## Render Deployment (Backend)

- [ ] Sign up/Login to Render
- [ ] Create new Web Service
- [ ] Connect GitHub repo
- [ ] Set root directory: `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add all environment variables
- [ ] Deploy and wait
- [ ] Run seed script in Shell
- [ ] Test API endpoint: `/api/health`

## Vercel Deployment (Frontend)

- [ ] Sign up/Login to Vercel
- [ ] Import GitHub repo
- [ ] Set framework: Vite
- [ ] Set root directory: `frontend`
- [ ] Set build command: `npm run build`
- [ ] Set output directory: `dist`
- [ ] Add VITE_API_URL environment variable
- [ ] Deploy and wait
- [ ] Test frontend loads

## Post-Deployment Testing

### Frontend Tests
- [ ] Homepage loads
- [ ] Jobs section displays
- [ ] Search and filters work
- [ ] Job detail modal opens
- [ ] About page loads
- [ ] Life at Talencee page loads
- [ ] Privacy Policy page loads
- [ ] Contact page loads
- [ ] Contact form works
- [ ] Footer links work
- [ ] Social links work
- [ ] Custom cursor appears
- [ ] Animations work smoothly
- [ ] Responsive on mobile

### Backend Tests
- [ ] API health check works
- [ ] GET /api/content returns data
- [ ] GET /api/jobs returns jobs
- [ ] POST /api/applications works
- [ ] Email notification sent
- [ ] Resume upload works
- [ ] Admin API works

### Integration Tests
- [ ] Frontend connects to backend
- [ ] CORS configured correctly
- [ ] No console errors
- [ ] All images load
- [ ] Forms submit successfully

## Performance Checks

- [ ] Frontend loads in < 3 seconds
- [ ] Backend responds in < 2 seconds
- [ ] Images optimized
- [ ] No memory leaks
- [ ] Mobile performance good

## Security Checks

- [ ] No API keys in frontend code
- [ ] CORS properly configured
- [ ] File upload validation works
- [ ] Admin API key required
- [ ] MongoDB connection secure
- [ ] HTTPS enabled (automatic on Vercel/Render)

## Final Steps

- [ ] Update README with live URLs
- [ ] Test from different devices
- [ ] Test from different browsers
- [ ] Share with friends for feedback
- [ ] Monitor Render/Vercel logs
- [ ] Set up error monitoring (optional)

## Maintenance

- [ ] Bookmark Render dashboard
- [ ] Bookmark Vercel dashboard
- [ ] Bookmark MongoDB Atlas
- [ ] Save all credentials securely
- [ ] Document any custom configurations

---

## Quick Commands Reference

### Local Development
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev

# Seed Database
cd backend
npm run seed
```

### Git Commands
```bash
git status
git add .
git commit -m "Your message"
git push origin main
```

### Deployment Updates
```bash
# Just push to GitHub
git add .
git commit -m "Update"
git push

# Vercel and Render auto-deploy from GitHub
```

---

**Ready to Deploy? Follow DEPLOYMENT.md step by step! 🚀**
