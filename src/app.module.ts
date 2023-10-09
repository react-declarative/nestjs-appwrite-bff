import { AppwriteService } from './service/appwrite.service';
import { ConfigService } from './service/config.service';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      useFactory: async (configService: ConfigService) => [
        ...(configService.globalConfig.staticPath && [
          { rootPath: configService.globalConfig.staticPath },
        ]),
      ],
      extraProviders: [ConfigService],
      inject: [ConfigService],
    }),
  ],
  providers: [AppwriteService, ConfigService],
})
export class AppModule { }
