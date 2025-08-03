# BounceBackAcademy Cloud Deployment Guide

This guide provides instructions for deploying the BounceBackAcademy application to various cloud platforms for wider access beyond your local network.

## Prerequisites

- Git installed on your computer
- Node.js and npm installed
- GitHub account
- Account on the cloud platform of your choice (Vercel, Netlify, or Heroku)
- Command-line tools for your chosen platform installed (optional but recommended)

## GitHub Repository Setup

Before deploying to a cloud platform, you should upload your project to GitHub. You can do this automatically using our script or manually following the steps below.

### Automatic Upload (Recommended)

Run the provided PowerShell script to automatically upload your project to GitHub:

```bash
.\upload-to-github.ps1
```

This script will:
- Check if Git is installed
- Verify or create a .gitignore file
- Initialize Git repository (if needed)
- Guide you through creating a GitHub repository
- Add the remote repository
- Commit and push your code

### Manual Upload

If you prefer to upload manually, follow these steps:

1. **Create a new repository on GitHub**

   - Go to [github.com](https://github.com) and sign in
   - Click on the '+' icon in the top-right corner and select 'New repository'
   - Name your repository (e.g., 'bounce-back-academy')
   - Choose whether to make it public or private
   - Click 'Create repository'

2. **Initialize Git in your project** (if not already done)

   ```bash
   git init
   ```

3. **Ensure your .gitignore file is properly configured**

   The project already includes a .gitignore file that excludes:
   - node_modules
   - dist
   - .env files (except .env.example)
   - .DS_Store
   - server/public
   - .netlify folder
   
   Make sure any additional sensitive data or large files are added to .gitignore before proceeding.

4. **Add your files to Git**

   ```bash
   git add .
   ```

5. **Commit your changes**

   ```bash
   git commit -m "Initial commit"
   ```

6. **Add the GitHub repository as a remote**

   ```bash
   git remote add origin https://github.com/yourusername/bounce-back-academy.git
   ```
   
   Replace 'yourusername' with your actual GitHub username.

7. **Push your code to GitHub**

   ```bash
   git push -u origin main
   ```
   
   Note: If your default branch is 'master' instead of 'main', use:
   
   ```bash
   git push -u origin master
   ```
   
8. **Verify your repository**

   Go to your GitHub repository page to confirm that all files have been uploaded correctly.

## GitHub Collaboration (Optional)

If you're working with a team, here are some best practices for collaboration:

1. **Branch Management**

   Create feature branches for new development:

   ```bash
   git checkout -b feature/new-feature-name
   ```

   After completing work on a feature branch:

   ```bash
   git push origin feature/new-feature-name
   ```

2. **Pull Requests**

   - On GitHub, navigate to your repository
   - Click on 'Pull requests' tab
   - Click 'New pull request'
   - Select your feature branch to merge into main
   - Add description and request reviews
   - Click 'Create pull request'

3. **Keeping Your Repository Updated**

   To get the latest changes from the remote repository:

   ```bash
   git pull origin main
   ```

4. **GitHub Actions for CI/CD** (Optional)

   You can set up GitHub Actions for continuous integration and deployment:

   - Create a `.github/workflows` directory in your repository
   - Add a YAML file (e.g., `ci-cd.yml`) with your workflow configuration
   - Example basic workflow for Node.js projects:

   ```yaml
   name: Node.js CI/CD

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     build-and-test:
       runs-on: ubuntu-latest
       steps:
       - uses: actions/checkout@v3
       - name: Use Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18.x'
       - run: npm ci
       - run: npm run build --if-present
       - run: npm test --if-present
   ```

## Deployment Options

After uploading your project to GitHub, choose one of the following cloud platforms to deploy your application:

### 1. Vercel Deployment

Vercel is ideal for Node.js applications and offers a seamless deployment experience.

#### Setup

1. **Install Vercel CLI** (optional)

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

#### Deploy

1. **Using Vercel CLI**

   ```bash
   npm run vercel:deploy
   ```

   Or manually:

   ```bash
   vercel --prod
   ```

2. **Using Vercel Dashboard**

   - Go to [vercel.com](https://vercel.com)
   - Create a new project
   - Import your GitHub repository
   - Configure the project settings
   - Deploy

### 2. Netlify Deployment

Netlify is great for static sites with serverless functions for backend functionality.

#### Setup

1. **Install Netlify CLI** (optional)

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**

   ```bash
   netlify login
   ```

3. **Install Required Dependencies**

   ```bash
   npm install serverless-http
   ```

#### Deploy

1. **Using Netlify CLI**

   ```bash
   npm run netlify:deploy
   ```

   Or manually:

   ```bash
   netlify deploy --prod
   ```

2. **Using Netlify Dashboard**

   - Go to [netlify.com](https://netlify.com)
   - Create a new site from Git
   - Connect to your GitHub repository
   - Configure build settings
   - Deploy

### 3. Heroku Deployment

Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

#### Setup

1. **Install Heroku CLI**

   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**

   ```bash
   heroku login
   ```

3. **Create a Heroku App**

   ```bash
   heroku create bounce-back-academy
   ```

#### Deploy

1. **Using Git**

   ```bash
   npm run heroku:deploy
   ```

   Or manually:

   ```bash
   git push heroku main
   ```

2. **Using Heroku Dashboard**

   - Go to [heroku.com](https://heroku.com)
   - Create a new app
   - Connect to your GitHub repository
   - Enable automatic deploys
   - Deploy

## Environment Variables

Make sure to set the following environment variables in your cloud platform's dashboard:

- `NODE_ENV`: Set to `production`
- `PORT`: Usually set automatically by the cloud provider
- `USE_MEMORY_STORAGE`: Set to `true` for simple deployments

For database connections, you may need to set:

- `DATABASE_URL`: Your database connection string

## Custom Domains

All the mentioned cloud platforms support custom domains. After deployment, you can configure your own domain in the platform's dashboard:

1. **Vercel**: Project Settings > Domains > Add Domain
2. **Netlify**: Site Settings > Domain Management > Add Custom Domain
3. **Heroku**: App Settings > Domains > Add Domain

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs for errors
   - Ensure all dependencies are correctly listed in package.json

2. **API Routes Not Working**
   - Verify the platform-specific configuration for API routes
   - Check environment variables

3. **Database Connection Issues**
   - Ensure your database is accessible from the cloud platform
   - Check connection strings and credentials

## Maintenance

After deployment, monitor your application using the tools provided by your chosen platform:

- **Vercel**: Analytics and Logs in the Dashboard
- **Netlify**: Analytics and Deploy Logs
- **Heroku**: Metrics and Logs

## Scaling

As your application grows, you may need to scale your resources:

- **Vercel**: Upgrade your plan for more resources
- **Netlify**: Upgrade to a paid plan for more build minutes and functions
- **Heroku**: Add dynos or upgrade to a paid plan

---

For more detailed information, refer to the official documentation of your chosen platform:

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Heroku Documentation](https://devcenter.heroku.com/)