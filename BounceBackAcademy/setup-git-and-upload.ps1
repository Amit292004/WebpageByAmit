# Setup Git and Upload to GitHub Script

Write-Host "===== BounceBackAcademy Git Setup and Upload ====="
Write-Host "This script will help you install Git and upload your project to GitHub."
Write-Host ""

# Step 1: Download and install Git
Write-Host "Step 1: Downloading Git for Windows..." -ForegroundColor Cyan
$gitInstallerUrl = "https://github.com/git-for-windows/git/releases/download/v2.41.0.windows.3/Git-2.41.0.3-64-bit.exe"
$gitInstallerPath = "$env:TEMP\GitInstaller.exe"

Write-Host "Downloading Git installer..."
try {
    Invoke-WebRequest -Uri $gitInstallerUrl -OutFile $gitInstallerPath
    Write-Host "Download complete!" -ForegroundColor Green
} catch {
    Write-Host "Failed to download Git installer: $_" -ForegroundColor Red
    exit 1
}

Write-Host "Installing Git..." -ForegroundColor Cyan
Write-Host "The installer will open. Please follow the installation steps."
Write-Host "Use the default options unless you have specific preferences."
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

try {
    Start-Process -FilePath $gitInstallerPath -ArgumentList "/SILENT" -Wait
    Write-Host "Git installation completed!" -ForegroundColor Green
} catch {
    Write-Host "Failed to install Git: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Verify Git installation
Write-Host "\nStep 2: Verifying Git installation..." -ForegroundColor Cyan
try {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
    $gitVersion = & "git" --version
    Write-Host "Git successfully installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "Git verification failed. Please restart your computer and try running the upload-to-github.ps1 script again." -ForegroundColor Red
    exit 1
}

# Step 3: Run the upload script
Write-Host "\nStep 3: Running the GitHub upload script..." -ForegroundColor Cyan
Write-Host "Press any key to continue to the upload process..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

try {
    & "./upload-to-github.ps1"
} catch {
    Write-Host "Failed to run the upload script: $_" -ForegroundColor Red
    exit 1
}