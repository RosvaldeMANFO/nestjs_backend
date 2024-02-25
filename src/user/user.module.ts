import { DynamicModule, Module } from "@nestjs/common";
import UserService from "./user.service";
import UserController from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "src/model/User.entity";

@Module({})
export default class UserModule { 
  static register(): DynamicModule{
    return {
      module: UserModule,
      controllers: [UserController],
      imports: [TypeOrmModule.forFeature([User])],
      providers: [
        {
          provide: UserService,
          useClass: UserService
        }
      ],
      exports: [
        UserService,
        TypeOrmModule
      ],
    }
  }
}
