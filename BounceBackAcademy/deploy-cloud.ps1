# Cloud Deployment Script for BounceBackAcademy

# Function to display menu and get user choice
function Show-Menu {
    Clear-Host
    Write-Host "===== BounceBackAcademy Cloud Deployment =====" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Select a cloud platform to deploy to:" -ForegroundColor Yellow
    Write-Host "1. Vercel (Recommended for Node.js apps)"
    Write-Host "2. Netlify (Good for static sites with serverless functions)"
    Write-Host "3. Heroku (Platform as a service)"
    Write-Host "4. Exit"
    Write-Host ""
    $choice = Read-Host "Enter your choice (1-4)"
    return $choice
}

# Function to deploy to Vercel
function Deploy-To-Vercel {
    Write-Host "\nDeploying to Vercel..." -ForegroundColor Green
    
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
}

# Function to deploy to Netlify
function Deploy-To-Netlify {
    Write-Host "\nDeploying to Netlify..." -ForegroundColor Green
    
    # Check if Netlify CLI is installed
    $netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue
    
    if (-not $netlifyInstalled) {
        Write-Host "Netlify CLI is not installed. Installing now..." -ForegroundColor Yellow
        npm install -g netlify-cli
    }
    
    # Check if serverless-http is installed
    $packageJson = Get-Content -Path "package.json" | ConvertFrom-Json
    $hasServerless = $packageJson.dependencies."serverless-http" -ne $null
    
    if (-not $hasServerless) {
        Write-Host "Installing serverless-http dependency..." -ForegroundColor Yellow
        npm install serverless-http --save
    }
    
    # Build the application
    Write-Host "Building the application..." -ForegroundColor Cyan
    npm run build
    
    # Deploy to Netlify
    Write-Host "Deploying to Netlify..." -ForegroundColor Cyan
    netlify deploy --prod
    
    Write-Host "Deployment to Netlify completed!" -ForegroundColor Green
}

# Function to deploy to Heroku
function Deploy-To-Heroku {
    Write-Host "\nDeploying to Heroku..." -ForegroundColor Green
    
    # Check if Heroku CLI is installed
    $herokuInstalled = Get-Command heroku -ErrorAction SilentlyContinue
    
    if (-not $herokuInstalled) {
        Write-Host "Heroku CLI is not installed. Installing now..." -ForegroundColor Yellow
        npm install -g heroku
    }
    
    # Check if Git is installed
    $gitInstalled = Get-Command git -ErrorAction SilentlyContinue
    
    if (-not $gitInstalled) {
        Write-Host "Git is not installed. Git is required for Heroku deployment." -ForegroundColor Red
        Write-Host "Please install Git from https://git-scm.com/ and try again." -ForegroundColor Yellow
        return
    }
    
    # Check if git is initialized
    if (-not (Test-Path ".git")) {
        Write-Host "Initializing git repository..." -ForegroundColor Yellow
        git init
        git add .
        git commit -m "Initial commit for Heroku deployment"
    }
    
    # Check if Heroku app exists
    $herokuAppExists = heroku apps | Select-String -Pattern "bounce-back-academy"
    
    if (-not $herokuAppExists) {
        Write-Host "Creating Heroku app..." -ForegroundColor Yellow
        heroku create bounce-back-academy
    }
    
    # Build the application
    Write-Host "Building the application..." -ForegroundColor Cyan
    npm run build
    
    # Deploy to Heroku
    Write-Host "Deploying to Heroku..." -ForegroundColor Cyan
    git add .
    git commit -m "Deploy to Heroku"
    git push heroku main
    
    Write-Host "Deployment to Heroku completed!" -ForegroundColor Green
    Write-Host "Your app is available at: https://bounce-back-academy.herokuapp.com" -ForegroundColor Cyan
}

# Function to check prerequisites
function Check-Prerequisites {
    Write-Host "\nChecking deployment prerequisites..." -ForegroundColor Cyan
    
    # Run the prerequisites check script
    if (Test-Path "./check-cloud-prerequisites.ps1") {
        & "./check-cloud-prerequisites.ps1"
    } else {
        Write-Host "Prerequisites check script not found. Continuing without checks." -ForegroundColor Yellow
    }
}

# Main script
Check-Prerequisites

$choice = Show-Menu

while ($choice -ne "4") {
    switch ($choice) {
        "1" { Deploy-To-Vercel }
        "2" { Deploy-To-Netlify }
        "3" { Deploy-To-Heroku }
        default { Write-Host "Invalid choice. Please try again." -ForegroundColor Red }
    }
    
    Write-Host "\nPress any key to return to the menu..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    $choice = Show-Menu
}

Write-Host "Exiting cloud deployment script." -ForegroundColor Cyan