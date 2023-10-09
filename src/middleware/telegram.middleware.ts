import { ConfigService } from 'src/service/config.service';
import { INestApplication } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

/**
 * TODO: remove this example
 */
export const informer = (nest: INestApplication) => {
  const configService = nest.get<ConfigService>(ConfigService);

  // @ts-ignore
  const informerUrl = `http://${configService.informerConfig.host}:${configService.informerConfig.port}`;

  nest.use(
    '/api/v1/do_inform',
    createProxyMiddleware({
      target: informerUrl.toString(),
      changeOrigin: true,
    }),
  );
};
