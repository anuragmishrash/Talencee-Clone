@echo off
REM Talencee MERN Clone - Automated Installation Script for Windows
REM This script installs all dependencies and sets up the project

echo ========================================
echo TALENCEE.COM MERN CLONE - AUTOMATED SETUP
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed. Please install Node.js first.
    echo   Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo + Node.js is installed
node --version
echo + NPM is installed
npm --version
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo X Failed to install backend dependencies
    pause
    exit /b 1
)
echo + Backend dependencies installed successfully
cd ..
echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo X Failed to install frontend dependencies
    pause
    exit /b 1
)
echo + Frontend dependencies installed successfully
cd ..
echo.

REM Seed database
echo Seeding database with initial data...
cd backend
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo ! Database seeding failed. You may need to configure MongoDB connection.
) else (
    echo + Database seeded successfully
)
cd ..
echo.

echo ========================================
echo INSTALLATION COMPLETE!
echo ========================================
echo.
echo ! IMPORTANT: Configure SMTP settings in backend\.env
echo   - SMTP_USER=your-email@gmail.com
echo   - SMTP_PASS=your-gmail-app-password
echo   - HR_EMAIL=hr@company.com
echo.
echo TO START THE APPLICATION:
echo.
echo   Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo.
echo   Terminal 2 - Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Access the application:
echo   - Landing Page: http://localhost:3000
echo   - Admin Panel: http://localhost:3000/admin
echo   - API Key: talencee-admin-2024-secure-key
echo.
echo For more information, see:
echo   - README.md
echo   - SETUP_GUIDE.md
echo   - FINAL_DELIVERY_SUMMARY.md
echo.
echo Enjoy your amazing MERN application!
echo.
pause
