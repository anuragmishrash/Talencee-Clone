# Deployment Guide

## Quick Deployment Checklist

### 1. Prepare for GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Talencee India Job Portal"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/talencee-india.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy Backend on Render

**Step-by-step:**

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `talencee-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/talencee?retryWrites=true&w=majority
   SMTP_HOST=smtp-relay.brevo.com
   SMTP_PORT=587
   SMTP_USER=your-brevo-smtp-login
   SMTP_PASS=your-brevo-smtp-key
   FROM_EMAIL=your-verified-email@example.com
   HR_EMAIL=hr@talencee.com
   ADMIN_API_KEY=talencee-admin-2024-secure-key
   ```

6. Click "Create Web Service"

7. Wait for deployment (5-10 minutes)

8. Copy your backend URL (e.g., `https://talencee-backend.onrender.com`)

9. **Seed Database** (one-time):
   - Go to your service dashboard
   - Click "Shell" tab
   - Run: `npm run seed`
   - Wait for success message

### 3. Deploy Frontend on Vercel

**Step-by-step:**

1. Go to https://vercel.com and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://talencee-backend.onrender.com/api` (your Render URL + /api)

6. Click "Deploy"

7. Wait for deployment (2-5 minutes)

8. Your site will be live at: `https://your-project.vercel.app`

### 4. MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Create a **FREE** cluster
4. Create Database User:
   - Username: `talencee`
   - Password: (generate strong password)
5. Network Access:
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (`0.0.0.0/0`)
6. Get Connection String:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `talencee`

### 5. Brevo (Sendinblue) SMTP Setup

1. Go to https://www.brevo.com and sign up
2. Verify your email address
3. Go to **SMTP & API** → **SMTP** in dashboard
4. Copy your SMTP credentials:
   - Server: `smtp-relay.brevo.com`
   - Port: `587`
   - Login: (your SMTP login)
   - Key: (your SMTP key)
5. Go to **Senders** → Verify your sender email
6. Free tier: 300 emails/day

**Note**: Gmail SMTP doesn't work reliably on cloud platforms like Render. Brevo is designed for this use case.

### 6. Test Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Visit `https://your-backend.onrender.com/api/health`
3. **Test Features**:
   - Browse jobs
   - Apply for a job (test email)
   - Visit About, Life, Privacy, Contact pages
   - Test admin panel: `https://your-frontend.vercel.app/admin`

## Environment Variables Summary

### Backend (Render)
```env
PORT=5000
MONGO_URI=mongodb+srv://...
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-brevo-smtp-login
SMTP_PASS=your-brevo-smtp-key
FROM_EMAIL=your-verified-email@example.com
HR_EMAIL=hr@talencee.com
ADMIN_API_KEY=talencee-admin-2024-secure-key
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

## Common Issues & Solutions

### Issue: Backend takes long to respond
**Solution**: Render free tier spins down after inactivity. First request takes 30-60 seconds.

### Issue: CORS errors
**Solution**: Ensure backend CORS is configured to allow your Vercel domain.

### Issue: MongoDB connection failed
**Solution**: 
- Check IP whitelist (should be 0.0.0.0/0)
- Verify connection string format
- Ensure password doesn't contain special characters (or URL encode them)

### Issue: Emails not sending
**Solution**:
- Use Gmail App Password (not regular password)
- Enable 2FA on Gmail
- Check SMTP credentials

### Issue: 404 on page refresh
**Solution**: `vercel.json` file handles this (already included)

## Post-Deployment

### Update Backend URL
If you change backend URL, update `VITE_API_URL` in Vercel:
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Update `VITE_API_URL`
4. Redeploy

### Custom Domain (Optional)
**Vercel:**
1. Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

**Render:**
1. Service Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

## Monitoring

### Render
- View logs: Dashboard → Logs
- Monitor metrics: Dashboard → Metrics

### Vercel
- View deployments: Dashboard → Deployments
- Check analytics: Dashboard → Analytics

## Backup & Maintenance

### Database Backup
- MongoDB Atlas: Automated backups on paid tiers
- Manual: Use `mongodump` command

### Update Content
- Use Admin Panel: `/admin`
- Or reseed database: Run `npm run seed` in Render Shell

## Cost Estimate

- **Render Free Tier**: $0/month (750 hours)
- **Vercel Free Tier**: $0/month (100GB bandwidth)
- **MongoDB Atlas Free**: $0/month (512MB storage)
- **Total**: $0/month for hobby projects

## Support

For issues, check:
1. Render logs
2. Vercel deployment logs
3. Browser console errors
4. MongoDB Atlas metrics

---

**Congratulations! Your Talencee India Job Portal is now live! 🎉**
