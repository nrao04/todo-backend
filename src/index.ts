import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { taskRoutes } from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import { securityHeaders } from './middleware/security';
import { validateEnvironment } from './utils/envValidator';
import { gracefulShutdown } from './utils/gracefulShutdown';

// Validate environment variables
validateEnvironment();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(securityHeaders);
app.use(requestLogger);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔒 Security headers enabled`);
  console.log(`📝 Request logging enabled`);
});

// Setup graceful shutdown
gracefulShutdown(server);
