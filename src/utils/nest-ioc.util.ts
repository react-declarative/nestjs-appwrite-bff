import { AppwriteService } from '../service/appwrite.service';
import { ConfigService } from '../service/config.service';
import { INestApplication } from '@nestjs/common';

export const ioc = async (app: INestApplication) => {
  globalThis.ioc = {
    appwriteService: app.get<AppwriteService>(AppwriteService),
    configService: app.get<ConfigService>(ConfigService),
  };
};
