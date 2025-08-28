import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface RequiredEnvVars {
  DATABASE_URL: string;
  PORT: string;
  NODE_ENV: string;
}

export const validateEnvironment = (): void => {
  const requiredVars: (keyof RequiredEnvVars)[] = ['DATABASE_URL', 'PORT', 'NODE_ENV'];
  const missingVars: string[] = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.error(' Missing required environment variables:');
    missingVars.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
    console.error('\n Please check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  // Validate DATABASE_URL format
  const dbUrl = process.env.DATABASE_URL!;
  if (!dbUrl.startsWith('mysql://')) {
    console.error(' DATABASE_URL must start with "mysql://"');
    process.exit(1);
  }

  // Validate PORT is a number
  const port = parseInt(process.env.PORT!);
  if (isNaN(port) || port < 1 || port > 65535) {
    console.error(' PORT must be a valid number between 1 and 65535');
    process.exit(1);
  }

  // Validate NODE_ENV
  const validEnvs = ['development', 'production', 'test'];
  if (!validEnvs.includes(process.env.NODE_ENV!)) {
    console.error(` NODE_ENV must be one of: ${validEnvs.join(', ')}`);
    process.exit(1);
  }

  console.log(' Environment validation passed');
  console.log(` Environment: ${process.env.NODE_ENV}`);
  console.log(` Port: ${process.env.PORT}`);
  console.log(
    ` Database: ${process.env.DATABASE_URL.split('@')[1]?.split('/')[0] || 'configured'}`
  );
};
