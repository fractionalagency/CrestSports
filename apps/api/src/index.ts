import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';

import { config } from '@config/env';
import { requestLogger, requestId } from '@middleware/logger';
import { errorHandler, notFoundHandler } from '@middleware/errorHandler';
import { logger } from '@utils/logger';

// Import routes
import healthRouter from '@routes/health.routes';
import productRouter from '@routes/product.routes';
import orderRouter from '@routes/order.routes';
import paymentRouter from '@routes/payment.routes';
import categoryRouter from '@routes/category.routes';
import devRouter from '@routes/dev.routes';

const app: Application = express();

// ============================================
// MIDDLEWARE
// ============================================

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.cors.origins,
    credentials: true,
  })
);

// Compression
app.use(compression());

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(requestId);
app.use(requestLogger);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(`/api/${config.apiVersion}`, limiter);

// ============================================
// ROUTES
// ============================================

const apiPrefix = `/api/${config.apiVersion}`;

app.use(`${apiPrefix}/health`, healthRouter);
app.use(`${apiPrefix}/products`, productRouter);
app.use(`${apiPrefix}/categories`, categoryRouter);
app.use(`${apiPrefix}/orders`, orderRouter);
app.use(`${apiPrefix}/payments`, paymentRouter);

if (config.isDevelopment) {
  app.use(`${apiPrefix}/dev`, devRouter);
}

// ============================================
// ERROR HANDLING
// ============================================

app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// SERVER START
// ============================================

const startServer = async (): Promise<void> => {
  try {
    app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port} in ${config.env} mode`);
      logger.info(`📍 API available at http://localhost:${config.port}${apiPrefix}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  void startServer();
}

export default app;
