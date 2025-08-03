# BounceBackAcademy Deployment Guide

## Local Network Deployment

This guide will help you deploy the BounceBackAcademy application on your local network, making it accessible to other users on the same network.

### Prerequisites

- Node.js installed on your computer
- Windows operating system
- Administrator access (for opening firewall ports)

### Deployment Steps

1. **Build and Start the Application**

   Run the deployment script to build and start the application:

   ```powershell
   .\deploy.ps1
   ```

   This script will:
   - Display your computer's IP addresses for network access
   - Build the application
   - Start the server in a new window
   - Open the application in your default browser

2. **Open Firewall Port (Required for Network Access)**

   To allow other users on your network to access the application, you need to open port 5000 in your firewall:

   - Right-click on PowerShell and select "Run as Administrator"
   - Navigate to the BounceBackAcademy directory
   - Run the firewall script:

   ```powershell
   .\open-firewall-port.ps1
   ```

3. **Share Access with Other Users**

   Once the application is running and the firewall port is open, other users on your network can access the application using one of your computer's IP addresses:

   ```
   http://YOUR-IP-ADDRESS:5000
   ```

   Replace `YOUR-IP-ADDRESS` with one of the IP addresses displayed when you ran the deployment script.

### Troubleshooting

- **Connection Refused Error**: Make sure the server is running and the firewall port is open.
- **Cannot Access from Other Devices**: Check that both your computer and the other devices are on the same network.
- **Server Crashes**: Check the terminal window where the server is running for error messages.

### Stopping the Server

To stop the server, simply close the PowerShell window where the server is running or press Ctrl+C in that window.

## Cloud Deployment

For wider access beyond your local network, you can deploy to a cloud platform. We've prepared configuration files and instructions for the following platforms:

- **Vercel**: Ideal for Node.js applications with seamless deployment
- **Netlify**: Great for static sites with serverless functions
- **Heroku**: Platform as a service with good scalability options

For detailed instructions on deploying to these platforms, please refer to the [CLOUD_DEPLOYMENT.md](./CLOUD_DEPLOYMENT.md) file.