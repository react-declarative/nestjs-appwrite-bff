import { Injectable, OnModuleInit } from '@nestjs/common';

import { Client } from 'appwrite';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppwriteService implements OnModuleInit {
  private client: Client;

  constructor(private readonly configService: ConfigService) {
    const { appwriteConfig: variables } = configService;
    if (!variables['APPWRITE_ENDPOINT']) {
      throw new Error('APPWRITE_ENDPOINT is not set');
    }
    if (!variables['APPWRITE_PROJECT_ID']) {
      throw new Error('APPWRITE_PROJECT_ID is not set');
    }
    if (!variables['APPWRITE_API_KEY']) {
      throw new Error('APPWRITE_API_KEY is not set');
    }
    if (!variables['APPWRITE_DATABASE_ID']) {
      throw new Error('APPWRITE_DATABASE_ID is not set');
    }
  }

  async onModuleInit() {
    const { appwriteConfig: variables } = this.configService;
    this.client = new Client();
    this.client
      .setEndpoint(variables['APPWRITE_ENDPOINT'])
      .setProject(variables['APPWRITE_PROJECT_ID'])
      .setLocale('ru-RU');
  }

  getRealtimeEmitter(channels: string | string[]) {
    return new Observable((subscriber) => {
      return this.client.subscribe(channels, (payload) => {
        subscriber.next(payload);
      });
    });
  }
}
