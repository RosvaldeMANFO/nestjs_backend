import { Injectable, NotFoundException } from "@nestjs/common";
import Task from "src/model/Task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import TaskDto from "./dto/taskDto";

@Injectable()
export default class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>
  ) { }
  async getAllTasks(): Promise<Task[]> {
    return await this.repository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.repository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return task;
  }

  async addTask(taskDto: TaskDto): Promise<Task> {
    let task = this.repository.create();
    task = Object.assign(task, taskDto);
    return await this.repository.save(task);
  }

  async updateTask(id: number, taskDto: TaskDto): Promise<Task> {
    let task = await this.repository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    task = Object.assign(task, taskDto);
    task.updatedAt = new Date();
    return await this.repository.save(task);
  }

  async deleteTask(id: number): Promise<string> {
    let task = await this.repository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    await this.repository.remove(task);
    return "Task deleted successfully";
  }
}
