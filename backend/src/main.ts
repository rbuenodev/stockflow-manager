import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Cache the Nest app instance for serverless cold starts
let cachedApp: INestApplication;
const server = express();

const bootstrap = async (expressInstance: any): Promise<INestApplication> => {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressInstance),
    );
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
};

// Local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap(server).then(() => {
    const port = 3200;
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  });
}

// Export for Vercel
export default async (req: any, res: any) => {
  await bootstrap(server);
  server(req, res);
};
