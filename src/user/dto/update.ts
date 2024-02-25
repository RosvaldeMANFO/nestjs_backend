import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import TaskDto from "src/task/dto/taskDto";

export default class UpdateUserDto {

  @IsOptional()
  @IsString({ message: "Username must be a string" })
  @IsNotEmpty({ message: "Username must not be empty" })  
  name?: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email must not be empty" })
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString({ message: "Password must be a string" }) 
  @IsNotEmpty({ message: "Password must not be empty" })
  password?: string;

  updateAt: Date = new Date();

  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => TaskDto)
  images: TaskDto[]
}