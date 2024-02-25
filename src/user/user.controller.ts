import { Body, Controller, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import UserService from "./user.service";
import User from "src/model/User.entity";
import CreateUserDto from "./dto/create";
import Result from "src/model/Result";
import { LoginDto } from "./dto/login";
import UpdateUserDto from "./dto/update";

@Controller('user')
export default class UserController {
  
  constructor(
    private readonly userService: UserService
  ){}

  @Post('/register')
  async registerUser(@Body() userDto: CreateUserDto): Promise<Result<User>> {
    try {
      let data = await this.userService.registerUser(userDto);
      return new Result<User>(data, null, 201, "User registered successfully");
    } catch (error) {
      return error.message;
    }
  }

  @Post('/login')
  async loginUser(@Body() loginDto: LoginDto): Promise<Result<string>> {
    try {
      let data = await this.userService.loginUser(loginDto.email, loginDto.password);
      return new Result<string>(data, null, 200, "User logged in successfully");
    } catch (error) {
      return error;
    }
  }

  @Put('/update/:id')
  async updateUser(@Param("id", ParseIntPipe) id: number, @Body() userDto: UpdateUserDto): Promise<Result<User>> {
    try {
      let data = await this.userService.updateUser(id, userDto);
      return new Result<User>(data, null, 201, "User updated successfully");
    } catch (error) {
      return error;
    }
  }
}