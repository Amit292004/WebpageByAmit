import express, { type Express, type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import http from "http";

// Export a function to set up the Express app for Netlify Functions
export async function setupApp(app: Express): Promise<http.Server> {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Serve static files from uploads directory
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Add CORS middleware to allow cross-origin requests
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      return res.status(200).json({});
    }
    next();
  });

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Only setup vite in development and after setting up all the other routes
  // so the catch-all route doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  
  return server;
}

// Run the server directly when this file is executed (not when imported)
// Using ES modules approach instead of CommonJS require.main === module
if (import.meta.url === import.meta.resolve(process.argv[1])) {
  (async () => {
    try {
      const app = express();
      const server = await setupApp(app);
      
      // ALWAYS serve the app on the port specified in the environment variable PORT
      // Other ports are firewalled. Default to 3000 if not specified.
      const port = parseInt(process.env.PORT || '3000', 10);
      server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
        // Keep the process running
        console.log(`Server is running at http://localhost:${port}`);
      }).on('error', (err) => {
        console.error('Server error:', err);
      });
      
      // Keep the process running
      process.on('SIGINT', () => {
        console.log('Shutting down server...');
        process.exit(0);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  })();
}
