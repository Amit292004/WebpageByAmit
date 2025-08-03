# Deployment script for BounceBackAcademy

# Display network information for access
Write-Host "Network Information for Remote Access:" -ForegroundColor Green
$IPAddresses = Get-NetIPAddress | Where-Object {$_.AddressFamily -eq "IPv4" -and $_.PrefixOrigin -ne "WellKnown"} | Select-Object IPAddress
Write-Host "Your computer's IP addresses:" -ForegroundColor Cyan
$IPAddresses | ForEach-Object { Write-Host "  http://$($_.IPAddress):5000" -ForegroundColor Yellow }
Write-Host ""

# Build the application
Write-Host "Building the application..." -ForegroundColor Green
npm run build

# Start the server in a new window that stays open
Write-Host "Starting the server in a new window..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; node --experimental-modules direct-server.js"

# Wait a moment for the server to start
Start-Sleep -Seconds 3

# Open the application in the default browser
Write-Host "Opening the application in the browser..." -ForegroundColor Green

# Display access information
Write-Host ""
Write-Host "Access Information:" -ForegroundColor Green
Write-Host "  Local access: http://localhost:5000" -ForegroundColor Yellow
Write-Host "  Network access: Use one of the IP addresses shown above" -ForegroundColor Yellow
Write-Host "  Share these links with users on your network to access the application" -ForegroundColor Cyan
Write-Host ""
Write-Host "NOTE: To allow network access, you may need to open port 5000 in your firewall." -ForegroundColor Magenta
Write-Host "      Run the 'open-firewall-port.ps1' script as Administrator to do this automatically." -ForegroundColor Magenta
Start-Process "http://localhost:5000"