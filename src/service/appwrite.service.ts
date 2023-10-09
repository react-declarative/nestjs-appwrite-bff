import { Account, Client } from 'appwrite';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable()
export class AppwriteService implements OnModuleInit {
  private client: Client;
  private account: Account;

  constructor(private readonly configService: ConfigService) {
    const { appwriteConfig: variables } = configService;
    if (!variables['APPWRITE_ENDPOINT']) {
      throw new Error('APPWRITE_ENDPOINT is not set');
    }
    if (!variables['APPWRITE_PROJECT_ID']) {
      throw new Error('APPWRITE_PROJECT_ID is not set');
    }
  }

  async onModuleInit() {
    const { appwriteConfig: variables } = this.configService;
    this.client = new Client();
    this.client
      .setEndpoint(variables['APPWRITE_ENDPOINT'])
      .setProject(variables['APPWRITE_PROJECT_ID'])
      .setLocale('ru-RU');
    this.account = new Account(this.client);
    if (variables.APPWRITE_EMAIL) {
      await this.account.createEmailSession(variables.APPWRITE_EMAIL, variables.APPWRITE_PASSWORD);
      return;
    }
    await this.account.createAnonymousSession();
  }

  getRealtimeEmitter(channels: string | string[]) {
    return new Observable((subscriber) => {
      return this.client.subscribe(channels, (payload) => {
        subscriber.next(payload);
      });
    });
  }
}
