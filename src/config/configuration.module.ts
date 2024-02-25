import { DynamicModule, Module } from "@nestjs/common";
import ConfigurationService from "./configureation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Task from "src/model/Task.entity";
import TaskService from "src/task/task.service";
import User from "src/model/User.entity";

@Module({})
export default class ConfigurationModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigurationModule,
      providers: [
        {
          provide: ConfigurationService,
          useClass: ConfigurationService,
        },
      ],
      imports: [
        TypeOrmModule.forRoot({
          type: options.dbType,
          database: options.dbPath,
          entities: [User, Task],
          synchronize: options.synchronize,
        })
      ],
      exports: [
        TypeOrmModule, 
        ConfigurationService
      ],
    };
  }
}