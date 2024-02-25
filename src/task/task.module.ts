import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import TaskController from "./task.controller";
import TaskService from "./task.service";
import Task from "src/model/Task.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import AuthenticateMiddleware from "src/middleware/authenticate.middleware";
import User from "src/model/User.entity";
import UserService from "src/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]),],
  controllers: [TaskController],
  providers: [
    TaskService,
    UserService
  ],
  exports: [TaskService]
})
export default class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticateMiddleware).forRoutes(TaskController);
  }
}