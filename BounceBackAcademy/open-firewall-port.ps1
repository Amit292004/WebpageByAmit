# Script to open port 5000 in Windows Firewall for BounceBackAcademy

# Check if running as administrator
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
$isAdmin = $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "This script needs to be run as Administrator to modify firewall rules." -ForegroundColor Red
    Write-Host "Please right-click on PowerShell and select 'Run as Administrator', then run this script again." -ForegroundColor Yellow
    exit
}

# Create firewall rule for inbound TCP traffic on port 5000
Write-Host "Creating firewall rule for BounceBackAcademy..." -ForegroundColor Green

# Check if the rule already exists
$existingRule = Get-NetFirewallRule -DisplayName "BounceBackAcademy" -ErrorAction SilentlyContinue

if ($existingRule) {
    Write-Host "Firewall rule 'BounceBackAcademy' already exists." -ForegroundColor Yellow
} else {
    # Create a new firewall rule
    New-NetFirewallRule -DisplayName "BounceBackAcademy" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow -Profile Private,Domain
    Write-Host "Firewall rule created successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Port 5000 is now open for BounceBackAcademy." -ForegroundColor Cyan
Write-Host "Users on your network can now access the application using your computer's IP address." -ForegroundColor Cyan
Write-Host "Example: http://YOUR-IP-ADDRESS:5000" -ForegroundColor Yellow