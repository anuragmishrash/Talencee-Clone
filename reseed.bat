@echo off
echo ========================================
echo RESEEDING DATABASE WITH INDIAN CONTENT
echo ========================================
echo.

cd backend
call npm run seed

echo.
echo ========================================
echo DATABASE RESEEDED SUCCESSFULLY!
echo ========================================
echo.
echo Now restart your backend server:
echo   cd backend
echo   npm run dev
echo.
pause
