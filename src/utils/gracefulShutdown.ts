import { Server } from 'http';
import { prisma } from '../lib/prisma';

export const gracefulShutdown = (server: Server) => {
  const shutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

    // Stop accepting new connections
    server.close(async () => {
      console.log('✅ HTTP server closed');

      try {
        // Close database connection
        await prisma.$disconnect();
        console.log('✅ Database connection closed');

        console.log('🚀 Graceful shutdown completed');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error('❌ Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  };

  // Handle different shutdown signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    shutdown('uncaughtException');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown('unhandledRejection');
  });
};
