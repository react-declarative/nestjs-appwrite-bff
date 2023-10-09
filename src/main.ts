import "./polyfills";

import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { appendFileSync } from 'fs';
import { appwriteRealtime } from './middleware/appwrite-realtime.middleware';
import { config } from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { example } from "./middleware/example.middleware";
import express from 'express';
import { ioc } from './utils/nest-ioc.util';
import { listen } from './utils/nest-listen.util';
import { serializeError } from 'serialize-error';

const bootstrap = async () => {
  const server = express();
  const httpServer = createServer(server);

  server.use(express.json());
  server.use(cors())

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();
  
  appwriteRealtime(app, httpServer);
  example(app);

  ioc(app);

  listen(app, httpServer);
};

process.on('uncaughtException', (error) => {
  appendFileSync('./error.log', JSON.stringify(serializeError(error), null, 2));
  process.exit(-1);
});

process.on('unhandledRejection', (error) => {
  throw error;
});

config();
bootstrap();
