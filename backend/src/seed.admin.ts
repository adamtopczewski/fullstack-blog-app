import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder/seeder.module';
import Seeder from './seeder/seeder';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext) => {
      const seeder = appContext.get(Seeder);
      seeder
        .seedAdminOnly()
        .then(() => {
          console.debug('Seeding admin complete');
        })
        .catch((error) => {
          console.error(`Failed to seed. Error: ${error}`);
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
