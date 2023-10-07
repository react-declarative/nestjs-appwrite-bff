import { ConfigService } from 'src/service/config.service';
import { INestApplication } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const appwriteProxy = (nest: INestApplication) => {
  const configService = nest.get<ConfigService>(ConfigService);
  const appwriteUrl = configService.appwriteConfig.APPWRITE_API_KEY;
  nest.use(
    '/v1',
    createProxyMiddleware({
      target: appwriteUrl.toString(),
      changeOrigin: true,
    }),
  );
};
