# Cloud Platform Selection Helper

Write-Host "===== BounceBackAcademy Cloud Platform Selection Guide =====" -ForegroundColor Cyan
Write-Host ""
Write-Host "This script will help you choose the best cloud platform for your needs." -ForegroundColor Yellow
Write-Host ""

# Function to display platform information
function Show-PlatformInfo {
    param (
        [string]$platform,
        [string]$description,
        [string[]]$pros,
        [string[]]$cons,
        [string]$bestFor,
        [string]$deployCommand
    )
    
    Write-Host "=== $platform ===" -ForegroundColor Green
    Write-Host "$description"
    Write-Host ""
    
    Write-Host "Pros:" -ForegroundColor Cyan
    foreach ($pro in $pros) {
        Write-Host "  + $pro"
    }
    Write-Host ""
    
    Write-Host "Cons:" -ForegroundColor Yellow
    foreach ($con in $cons) {
        Write-Host "  - $con"
    }
    Write-Host ""
    
    Write-Host "Best for:" -ForegroundColor Magenta
    Write-Host "  $bestFor"
    Write-Host ""
    
    Write-Host "To deploy:" -ForegroundColor White
    Write-Host "  $deployCommand"
    Write-Host ""
}

# Ask user about their priorities
Write-Host "What is your top priority for deployment?" -ForegroundColor Yellow
Write-Host "1. Ease of deployment (minimal configuration)"
Write-Host "2. Performance and scalability"
Write-Host "3. Cost (free tier options)"
Write-Host "4. Custom domain and SSL support"
Write-Host "5. Show information for all platforms"
$priority = Read-Host "Enter your choice (1-5)"

# Display platform information based on user's priority
Write-Host ""

switch ($priority) {
    "1" { # Ease of deployment
        Show-PlatformInfo -platform "Vercel" `
            -description "Vercel is a cloud platform for static sites and serverless functions that's optimized for frontend frameworks." `
            -pros @("One-click deployment", "Automatic CI/CD", "Preview deployments for each PR", "Excellent developer experience") `
            -cons @("Limited backend capabilities", "Can get expensive for high-traffic sites") `
            -bestFor "Frontend-heavy applications with minimal backend requirements" `
            -deployCommand "Run: .\deploy-cloud.ps1 and select option 1"
    }
    "2" { # Performance and scalability
        Show-PlatformInfo -platform "Heroku" `
            -description "Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud." `
            -pros @("Good scalability options", "Managed database services", "Add-ons ecosystem", "Good for full-stack applications") `
            -cons @("More expensive than other options", "Sleep mode for free tier", "Requires Git for deployment") `
            -bestFor "Applications that need to scale and have complex backend requirements" `
            -deployCommand "Run: .\deploy-cloud.ps1 and select option 3"
    }
    "3" { # Cost
        Show-PlatformInfo -platform "Netlify" `
            -description "Netlify is a web developer platform that multiplies productivity by unifying the modern web ecosystem." `
            -pros @("Generous free tier", "Built-in CI/CD", "Serverless functions", "Forms handling") `
            -cons @("Limited backend capabilities", "Function execution limits") `
            -bestFor "Static sites with minimal backend requirements and budget constraints" `
            -deployCommand "Run: .\deploy-cloud.ps1 and select option 2"
    }
    "4" { # Custom domain and SSL
        Show-PlatformInfo -platform "Vercel" `
            -description "Vercel is a cloud platform for static sites and serverless functions that's optimized for frontend frameworks." `
            -pros @("Free custom domains", "Automatic SSL", "Easy DNS configuration", "CDN by default") `
            -cons @("Limited backend capabilities", "Can get expensive for high-traffic sites") `
            -bestFor "Applications that need professional domain setup with minimal effort" `
            -deployCommand "Run: .\deploy-cloud.ps1 and select option 1"
    }
    "5" { # All platforms
        Show-PlatformInfo -platform "Vercel" `
            -description "Vercel is a cloud platform for static sites and serverless functions that's optimized for frontend frameworks." `
            -pros @("One-click deployment", "Automatic CI/CD", "Preview deployments for each PR", "Excellent developer experience") `
            -cons @("Limited backend capabilities", "Can get expensive for high-traffic sites") `
            -bestFor "Frontend-heavy applications with minimal backend requirements" `
            -deployCommand "Run: .\deploy-cloud.ps1 and select option 1"
        
        Show-PlatformInfo -platform "Netlify" `
            -description "Netlify is a web developer platform that multiplies productivity by unifying the modern web ecosystem." `
            -pros @("Generous free tier", "Built-in CI/CD", "Serverless functions", "Forms handling") `
            -cons @("Limited backend capabilities", "Function execution limits") `
            -bestFor "Static sites with minimal backend requirements and budget constraints" `
            -deployCommand "Run: .\deploy-cloud.ps1 and select option 2"
        
        Show-PlatformInfo -platform "Heroku" `
            -description "Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud." `
            -pros @("Good scalability options", "Managed database services", "Add-ons ecosystem", "Good for full-stack applications") `
            -cons @("More expensive than other options", "Sleep mode for free tier", "Requires Git for deployment") `
            -bestFor "Applications that need to scale and have complex backend requirements" `
            -deployCommand "Run: .\deploy-cloud.ps1 and select option 3"
    }
    default {
        Write-Host "Invalid choice. Please run the script again and select a valid option." -ForegroundColor Red
    }
}

Write-Host "For detailed deployment instructions, please refer to CLOUD_DEPLOYMENT.md" -ForegroundColor Cyan