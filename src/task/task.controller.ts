import { Controller, Param, Get, ParseIntPipe, Post, Body, Put, Delete, Query, MiddlewareConsumer } from "@nestjs/common";
import TaskService from "./task.service";
import Character from "src/model/Task.entity";
import Result from "src/model/Result";
import Task from "src/model/Task.entity";
import TaskDto from "./dto/taskDto";
import UserService from "src/user/user.service";
import { Payload } from "src/model/Types";

@Controller('task')
export default class TaskController {

  constructor(
    private readonly service: TaskService,
    private readonly userService: UserService
  ) { }

  @Post("/add")
  async addTask(@Body() taskDto: TaskDto, @Query("payload") payload: Payload): Promise<Result<Task>> {
    try {
      const user = await this.userService.getUserByEmail(payload.email);
      taskDto.user = user;
      let data = await this.service.addTask(taskDto);
      return new Result<Task>(data, null, 201, "Success");
    } catch (error) {
      return error;
    }
  }

  @Get("/all")
  async getAllTasks(): Promise<Result<Character[]>> {
    let data = await this.service.getAllTasks();
    return new Result<Task[]>(data, null, 200, "Success");
  }

  @Get("/:id")
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Result<Task>> {
    let data = await this.service.getTaskById(id);
    return new Result<Task>(data, null, 200, "Success");
  }

  @Put("/update/:id")
  async updateTask(@Param('id', ParseIntPipe) id: number, @Body() taskDto: TaskDto): Promise<Result<Task>> {
    try {
      let data = await this.service.updateTask(id, taskDto);
      return new Result<Task>(data, null, 201, "Success");
    } catch (error) {
      return error;
    }
  }

  @Delete("/delete/:id")
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Result<string>> {
    try {
      let data = await this.service.deleteTask(id);
      return new Result<string>(data, null, 201, "Success");
    } catch (error) {
      return error;
    }
  }
}
