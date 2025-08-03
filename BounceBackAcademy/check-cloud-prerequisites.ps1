# Check Cloud Deployment Prerequisites Script

Write-Host "===== Checking Cloud Deployment Prerequisites =====" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command is available
function Test-CommandExists {
    param ($command)
    $exists = $null -ne (Get-Command $command -ErrorAction SilentlyContinue)
    return $exists
}

# Check Node.js
Write-Host "Checking Node.js..." -NoNewline
if (Test-CommandExists "node") {
    $nodeVersion = node -v
    Write-Host " Installed ($nodeVersion)" -ForegroundColor Green
} else {
    Write-Host " Not installed" -ForegroundColor Red
    Write-Host "   Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
}

# Check npm
Write-Host "Checking npm..." -NoNewline
if (Test-CommandExists "npm") {
    $npmVersion = npm -v
    Write-Host " Installed ($npmVersion)" -ForegroundColor Green
} else {
    Write-Host " Not installed" -ForegroundColor Red
    Write-Host "   npm should be installed with Node.js" -ForegroundColor Yellow
}

# Check Git
Write-Host "Checking Git..." -NoNewline
if (Test-CommandExists "git") {
    $gitVersion = git --version
    Write-Host " Installed ($gitVersion)" -ForegroundColor Green
} else {
    Write-Host " Not installed" -ForegroundColor Red
    Write-Host "   Please install Git from https://git-scm.com/" -ForegroundColor Yellow
}

# Check Vercel CLI
Write-Host "Checking Vercel CLI..." -NoNewline
if (Test-CommandExists "vercel") {
    Write-Host " Installed" -ForegroundColor Green
} else {
    Write-Host " Not installed" -ForegroundColor Yellow
    Write-Host "   To install: npm install -g vercel" -ForegroundColor Yellow
}

# Check Netlify CLI
Write-Host "Checking Netlify CLI..." -NoNewline
if (Test-CommandExists "netlify") {
    Write-Host " Installed" -ForegroundColor Green
} else {
    Write-Host " Not installed" -ForegroundColor Yellow
    Write-Host "   To install: npm install -g netlify-cli" -ForegroundColor Yellow
}

# Check Heroku CLI
Write-Host "Checking Heroku CLI..." -NoNewline
if (Test-CommandExists "heroku") {
    Write-Host " Installed" -ForegroundColor Green
} else {
    Write-Host " Not installed" -ForegroundColor Yellow
    Write-Host "   To install: npm install -g heroku" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "===== Checking Project Configuration =====" -ForegroundColor Cyan

# Check for vercel.json
Write-Host "Checking vercel.json..." -NoNewline
if (Test-Path "vercel.json") {
    Write-Host " Found" -ForegroundColor Green
} else {
    Write-Host " Not found" -ForegroundColor Yellow
    Write-Host "   This file will be created during deployment" -ForegroundColor Yellow
}

# Check for netlify.toml
Write-Host "Checking netlify.toml..." -NoNewline
if (Test-Path "netlify.toml") {
    Write-Host " Found" -ForegroundColor Green
} else {
    Write-Host " Not found" -ForegroundColor Yellow
    Write-Host "   This file will be created during deployment" -ForegroundColor Yellow
}

# Check for Procfile (Heroku)
Write-Host "Checking Procfile..." -NoNewline
if (Test-Path "Procfile") {
    Write-Host " Found" -ForegroundColor Green
} else {
    Write-Host " Not found" -ForegroundColor Yellow
    Write-Host "   This file will be created during deployment" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "===== Summary =====" -ForegroundColor Cyan
Write-Host "You can deploy to cloud platforms using the deploy-cloud.ps1 script." -ForegroundColor White
Write-Host "Missing prerequisites will be installed during the deployment process." -ForegroundColor White
Write-Host "For detailed instructions, see CLOUD_DEPLOYMENT.md" -ForegroundColor White

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")