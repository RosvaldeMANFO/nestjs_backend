import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ConfigurationModule from './config/configuration.module';
import TaskModule from './task/task.module';
import UserModule from './user/user.module';

@Module({
  imports: [
    ConfigurationModule.register({
      dbType: process.env.DB_TYPE,
      dbPath: process.env.DB_PATH,
      synchronize: true
    }),
    UserModule.register(),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
