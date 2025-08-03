# GitHub Repository Upload Script for BounceBackAcademy

# Function to check if Git is installed
function Check-Git {
    $gitInstalled = Get-Command git -ErrorAction SilentlyContinue
    
    if (-not $gitInstalled) {
        Write-Host "Git is not installed. Please install Git from https://git-scm.com/ and try again." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Git is installed." -ForegroundColor Green
}

# Function to check if .gitignore exists
function Check-GitIgnore {
    if (Test-Path ".gitignore") {
        Write-Host ".gitignore file exists." -ForegroundColor Green
    } else {
        Write-Host ".gitignore file does not exist. Creating a basic one..." -ForegroundColor Yellow
        @"
node_modules
dist
.DS_Store
server/public
vite.config.ts.*
*.tar.gz

# Environment variables
.env
.env.*
!.env.example

# Local Netlify folder
.netlify
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
        Write-Host "Created .gitignore file." -ForegroundColor Green
    }
}

# Function to initialize Git repository
function Initialize-Git {
    if (-not (Test-Path ".git")) {
        Write-Host "Initializing Git repository..." -ForegroundColor Yellow
        git init
        Write-Host "Git repository initialized." -ForegroundColor Green
    } else {
        Write-Host "Git repository already initialized." -ForegroundColor Green
    }
}

# Function to get GitHub repository details
function Get-GitHubDetails {
    Write-Host "\nGitHub Repository Setup" -ForegroundColor Cyan
    
    $repoName = Read-Host "Enter repository name (e.g., bounce-back-academy)"
    $username = Read-Host "Enter your GitHub username"
    $isPrivate = Read-Host "Make repository private? (y/n)"
    
    $private = $false
    if ($isPrivate -eq "y" -or $isPrivate -eq "Y") {
        $private = $true
    }
    
    return @{
        RepoName = $repoName
        Username = $username
        Private = $private
    }
}

# Function to create GitHub repository
function Create-GitHubRepo {
    param (
        [string]$repoName,
        [bool]$private
    )
    
    Write-Host "\nPlease create a new repository on GitHub:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Cyan
    Write-Host "2. Repository name: $repoName" -ForegroundColor Cyan
    Write-Host "3. Set visibility to: $(if ($private) { 'Private' } else { 'Public' })" -ForegroundColor Cyan
    Write-Host "4. Click 'Create repository'" -ForegroundColor Cyan
    Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Red
    
    $confirmation = Read-Host "Have you created the repository? (y/n)"
    
    if ($confirmation -ne "y" -and $confirmation -ne "Y") {
        Write-Host "Repository creation cancelled. Exiting..." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Repository created successfully." -ForegroundColor Green
}

# Function to add remote repository
function Add-GitRemote {
    param (
        [string]$username,
        [string]$repoName
    )
    
    $remoteUrl = "https://github.com/$username/$repoName.git"
    
    # Check if remote already exists
    $remoteExists = git remote -v | Select-String -Pattern "origin"
    
    if ($remoteExists) {
        Write-Host "Remote 'origin' already exists. Updating..." -ForegroundColor Yellow
        git remote remove origin
    }
    
    git remote add origin $remoteUrl
    Write-Host "Remote repository added: $remoteUrl" -ForegroundColor Green
}

# Function to add and commit files
function Add-CommitFiles {
    Write-Host "\nAdding files to Git..." -ForegroundColor Yellow
    git add .
    
    $commitMessage = Read-Host "Enter commit message (default: 'Initial commit')"
    if ([string]::IsNullOrWhiteSpace($commitMessage)) {
        $commitMessage = "Initial commit"
    }
    
    Write-Host "Committing files..." -ForegroundColor Yellow
    git commit -m $commitMessage
    Write-Host "Files committed." -ForegroundColor Green
}

# Function to push to GitHub
function Push-ToGitHub {
    Write-Host "\nPushing to GitHub..." -ForegroundColor Yellow
    
    # Check default branch name
    $defaultBranch = git branch --show-current
    
    if ([string]::IsNullOrWhiteSpace($defaultBranch)) {
        # If no branch exists, create main branch
        Write-Host "No branch detected. Creating 'main' branch..." -ForegroundColor Yellow
        git checkout -b main
        $defaultBranch = "main"
    }
    
    Write-Host "Pushing to branch: $defaultBranch" -ForegroundColor Cyan
    git push -u origin $defaultBranch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Successfully pushed to GitHub." -ForegroundColor Green
    } else {
        Write-Host "Failed to push to GitHub. Please check your credentials and try again." -ForegroundColor Red
    }
}

# Main script
Write-Host "===== BounceBackAcademy GitHub Upload ====="  -ForegroundColor Cyan
Write-Host "This script will upload your project to GitHub." -ForegroundColor White
Write-Host ""

# Check prerequisites
Check-Git
Check-GitIgnore

# Initialize Git repository
Initialize-Git

# Get GitHub repository details
$repoDetails = Get-GitHubDetails

# Create GitHub repository
Create-GitHubRepo -repoName $repoDetails.RepoName -private $repoDetails.Private

# Add remote repository
Add-GitRemote -username $repoDetails.Username -repoName $repoDetails.RepoName

# Add and commit files
Add-CommitFiles

# Push to GitHub
Push-ToGitHub

Write-Host "\n===== GitHub Upload Complete ====="  -ForegroundColor Cyan
Write-Host "Your project has been uploaded to GitHub." -ForegroundColor Green
Write-Host "Repository URL: https://github.com/$($repoDetails.Username)/$($repoDetails.RepoName)" -ForegroundColor Yellow
Write-Host "\nNext steps:" -ForegroundColor Cyan
Write-Host "1. For cloud deployment, run: .\deploy-cloud.ps1" -ForegroundColor White
Write-Host "2. For more information, see: CLOUD_DEPLOYMENT.md" -ForegroundColor White