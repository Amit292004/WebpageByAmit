# Simple Cloud Configuration Test Script

Write-Host "===== Testing Cloud Deployment Configurations =====" -ForegroundColor Cyan

# Test Vercel configuration
if (Test-Path "./vercel.json") {
    Write-Host "Vercel configuration: Found" -ForegroundColor Green
} else {
    Write-Host "Vercel configuration: Not found" -ForegroundColor Red
}

# Test Netlify configuration
if (Test-Path "./netlify.toml") {
    Write-Host "Netlify configuration: Found" -ForegroundColor Green
} else {
    Write-Host "Netlify configuration: Not found" -ForegroundColor Red
}

# Test Netlify functions
if (Test-Path "./netlify/functions/api.js") {
    Write-Host "Netlify serverless function: Found" -ForegroundColor Green
} else {
    Write-Host "Netlify serverless function: Not found" -ForegroundColor Red
}

# Test Heroku configuration
if (Test-Path "./Procfile") {
    Write-Host "Heroku configuration: Found" -ForegroundColor Green
} else {
    Write-Host "Heroku configuration: Not found" -ForegroundColor Red
}

# Test package.json for deployment scripts
if (Test-Path "./package.json") {
    Write-Host "package.json: Found" -ForegroundColor Green
    try {
        $packageJson = Get-Content "./package.json" | ConvertFrom-Json
        $scripts = $packageJson.scripts
        
        if ($scripts."vercel:deploy") {
            Write-Host "vercel:deploy script: Found" -ForegroundColor Green
        } else {
            Write-Host "vercel:deploy script: Not found" -ForegroundColor Yellow
        }
        
        if ($scripts."netlify:deploy") {
            Write-Host "netlify:deploy script: Found" -ForegroundColor Green
        } else {
            Write-Host "netlify:deploy script: Not found" -ForegroundColor Yellow
        }
        
        if ($scripts."heroku:deploy") {
            Write-Host "heroku:deploy script: Found" -ForegroundColor Green
        } else {
            Write-Host "heroku:deploy script: Not found" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Error parsing package.json" -ForegroundColor Red
    }
} else {
    Write-Host "package.json: Not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "===== Summary =====" -ForegroundColor Cyan
Write-Host "The cloud deployment configurations have been tested." -ForegroundColor White
Write-Host "Any missing configurations will be created during deployment." -ForegroundColor White
Write-Host "For detailed instructions, see CLOUD_DEPLOYMENT.md" -ForegroundColor White