import { ConfigService } from 'src/service/config.service';
import { INestApplication } from '@nestjs/common';

export const example = (nest: INestApplication) => {
  const configService = nest.get<ConfigService>(ConfigService);
  nest.use(
    '/api/v1/get_config',
    (req, res) => {
      console.log(req.body);
      res.send({
        endpoint: configService.appwriteConfig.APPWRITE_ENDPOINT,
        projectId: configService.appwriteConfig.APPWRITE_PROJECT_ID,
      }); 
    },
  );
};
