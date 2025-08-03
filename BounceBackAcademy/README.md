# BounceBackAcademy

A comprehensive educational platform for NBSE (Nagaland Board of School Education) students, providing access to previous year question papers, educational videos, and study materials.

## Features

- **Question Papers**: Access to previous year question papers for Classes 8-12
- **Educational Videos**: Curated YouTube videos for various subjects
- **Notes**: Downloadable study materials
- **Admin Dashboard**: Manage content, users, and monitor statistics
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React with TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication
- **File Storage**: Local file system (configurable)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (optional, can use in-memory storage for development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd BounceBackAcademy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your configuration

# Initialize the database (if using PostgreSQL)
npm run db:setup

# Start the development server
npm run dev
```

## Deployment

### Local Network Deployment

To deploy the application on your local network, making it accessible to other users on the same network:

```bash
# Run the deployment script
.\deploy.ps1

# Open firewall port (as Administrator)
.\open-firewall-port.ps1
```

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Cloud Deployment

For wider access beyond your local network, you can deploy to cloud platforms like Vercel, Netlify, or Heroku:

```bash
# Run the cloud deployment script
.\deploy-cloud.ps1
```

For detailed instructions, see [CLOUD_DEPLOYMENT.md](./CLOUD_DEPLOYMENT.md).

## Usage

```bash
git clone https://github.com/yourusername/BounceBackAcademy.git
cd BounceBackAcademy
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file based on `.env.example`

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=5000
NODE_ENV=development
USE_MEMORY_STORAGE=false
```

4. Set up the database (if not using in-memory storage)

```bash
npm run db:setup
```

5. Start the development server

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5000`

## Development

### Project Structure

```
├── client/             # Frontend React application
│   ├── public/         # Static assets
│   └── src/            # React source code
├── server/             # Backend Express application
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Data storage layer
│   └── index.ts        # Server entry point
├── shared/             # Shared code between client and server
│   └── schema.ts       # Database schema definitions
├── migrations/         # Database migrations
├── scripts/            # Utility scripts
└── uploads/            # Uploaded files
    ├── papers/         # Question papers
    └── notes/          # Study notes
```

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run db:push` - Push schema changes to the database
- `npm run db:migrate` - Run database migrations
- `npm run db:init` - Initialize the database with sample data
- `npm run db:setup` - Complete database setup (push + init)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deployment Options

#### Option 1: Traditional Hosting

```bash
npm run build
npm run start
```

#### Option 2: Docker

```bash
docker-compose up -d
```

#### Option 3: Deployment Scripts

For Windows:
```bash
.\deploy.ps1
```

For Linux/macOS:
```bash
chmod +x deploy.sh
./deploy.sh
```

#### Option 4: Vercel

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

```bash
# Connect your repository to Vercel and deploy
```

#### Option 5: Netlify

See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for detailed instructions.

For Windows:
```bash
.\netlify-deploy.ps1
```

For Linux/macOS:
```bash
chmod +x netlify-deploy.sh
./netlify-deploy.sh
```

#### Option 6: GitHub Pages and GitHub Actions

See [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md) for detailed instructions.

For Windows:
```bash
.\github-deploy.ps1
```

For Linux/macOS:
```bash
chmod +x github-deploy.sh
./github-deploy.sh
```

## Database Configuration

See [DATABASE.md](./DATABASE.md) for detailed database setup instructions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Frontend build tool
- [Express.js](https://expressjs.com/) - Backend framework
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM