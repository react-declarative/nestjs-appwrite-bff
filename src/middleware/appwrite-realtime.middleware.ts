import { AppwriteService } from 'src/service/appwrite.service';
import { INestApplication } from '@nestjs/common';
import { Server } from 'http';
import { Subscription } from 'rxjs';
import { createServer } from 'sockjs';

export const appwriteRealtime = (app: INestApplication, server: Server) => {
  const appwriteService = app.get<AppwriteService>(AppwriteService);

  const io = createServer();

  io.installHandlers(server, {
    prefix: '/realtime',
  });

  io.on('connection', (client) => {
    client.once('data', async (channels) => {
      let subscription: Subscription | undefined;
      try {
        subscription = appwriteService.getRealtimeEmitter(JSON.parse(channels)).subscribe({
          next: (payload) => {
            client.write(JSON.stringify(payload), (err) => {
              if (err) {
                subscription && subscription.unsubscribe();
                client.close('500');
              }
            });
          },
          error: () => {
            subscription && subscription.unsubscribe();
            client.close('500');
          },
          complete: () => client.close('500'),
        });
        client.once('close', () => subscription && subscription.unsubscribe());
      } catch (err) {
        client.close('500');
      }
    });
  });
};
