import { IsString, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import TaskStatus from "src/model/TaskStatus";
import User from "src/model/User.entity";

export default class TaskDto {

  @IsOptional()
  id?: string;
  @IsOptional()
  user?: User

  @IsNotEmpty({ message: "Task must have a title" })
  @IsString()
  title: string;

  @IsNotEmpty({ message: "Task must have a description" })
  @IsString()
  description: string;

  @IsIn(Object.values(TaskStatus), { message: "Invalid status" })
  status: string;
}