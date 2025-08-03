// Netlify serverless function to handle API requests
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const cors = require('cors');

// Import routes (adjust path as needed)
const routes = require('../../dist/routes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use API routes
app.use('/api', routes);

// Export the serverless function
module.exports.handler = serverless(app);