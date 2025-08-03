# Simple Vercel Deployment Script for BounceBackAcademy

Write-Host "===== Deploying BounceBackAcademy to Vercel =====" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Vercel CLI is not installed. Installing now..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build the application
Write-Host "Building the application..." -ForegroundColor Cyan
npm run build

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Cyan
vercel --prod

Write-Host "Deployment to Vercel completed!" -ForegroundColor Green
Write-Host "Your application should now be accessible via the URL provided by Vercel." -ForegroundColor Cyan