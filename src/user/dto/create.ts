import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested, } from "class-validator";
import TaskDto from "src/task/dto/taskDto";

export default class CreateUserDto {

  @IsString({ message: "Username must be a string" })
  @IsNotEmpty({ message: "Password must not be empty" })
  name: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Password must not be empty" })
  email: string;

  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password must not be empty" })
  password: string;

  @ValidateNested()
  @IsArray()
  @Type(() => TaskDto)
  tasks: TaskDto[]
}