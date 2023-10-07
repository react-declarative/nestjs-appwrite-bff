import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get appwriteConfig() {
    return {
      APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
      APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID || '64b53d0c41fcf5093b12',
      APPWRITE_API_KEY: process.env.APPWRITE_API_KEY || 'd661ae0064aa9cd11ba886ccfa738a75a05c68e02856ba',
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID || '64c4de8e7b9809ef',
    };
  }

  get globalConfig() {
    return {
      staticPath: process.env.STATIC_PATH || '',
      host: process.env.APP_HOST || '0.0.0.0',
      port: +process.env.APP_PORT || 8080,
    };
  }

  get exchangeConfig() {
    return {
      apiKey:
        process.env.API_KEY ||
        '83jBpt8ItE5GKJjxJQ51WafkNNUEPgBRCZFw2emWpWOwZKxHIbNkH6ue9OhHiw1r',
      apiSecret:
        process.env.API_SECRET ||
        'iYno7Ja6pywGuuNPf578raD0mNTatr7yYl4IrRweJbyAm6PS32mtacy4SwxXT1Jn',
      useServerTime: true,
    };
  }
}
