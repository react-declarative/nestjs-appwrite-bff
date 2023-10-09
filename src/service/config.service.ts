import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get appwriteConfig() {
    return {
      APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID || '64b53d0c41fcf5093b12',
      APPWRITE_EMAIL: process.env.APPWRITE_EMAIL|| '',
      APPWRITE_PASSWORD: process.env.APPWRITE_PASSWORD || '',
    };
  }

  get globalConfig() {
    return {
      staticPath: process.env.STATIC_PATH || './static',
      host: process.env.APP_HOST || '0.0.0.0',
      port: +process.env.APP_PORT || 8081,
    };
  }

}
