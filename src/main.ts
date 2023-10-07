import "./polyfills";

import * as express from 'express';

import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { appendFileSync } from 'fs';
import { appwriteProxy } from './middleware/appwrite-proxy.middleware';
import { appwriteRealtime } from './middleware/appwrite-realtime.middleware';
import { config } from 'dotenv';
import { createServer } from 'http';
import { ioc } from './utils/nest-ioc.util';
import { listen } from './utils/nest-listen.util';
import { serializeError } from 'serialize-error';

const bootstrap = async () => {
  const server = express();
  const httpServer = createServer(server);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  appwriteRealtime(app, httpServer);
  appwriteProxy(app);

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
