import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log request details
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${req.ip}`);

  // Log request body for non-GET requests
  if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
    console.log(`📝 Request Body:`, JSON.stringify(req.body, null, 2));
  }

  // Log response time and status
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '🔴' : res.statusCode >= 300 ? '🟡' : '🟢';

    console.log(`${statusColor} ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  next();
};
