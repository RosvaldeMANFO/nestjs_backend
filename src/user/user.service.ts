import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "src/model/User.entity";
import { Repository } from "typeorm";
import CreateUserDto from "./dto/create";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import UpdateUserDto from "./dto/update";
import { Payload } from "src/model/Types";

@Injectable()
export default class UserService {
  saltOrRounds: number = 10;
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  async registerUser(userDto: CreateUserDto): Promise<User> {
    let user = this.repository.create();
    user = Object.assign(user, userDto);
    const salt = await bcrypt.genSalt(this.saltOrRounds);
    user.password = await bcrypt.hash(user.password, salt);
    return await this.repository.save(user);
  }

  async loginUser(email: string, password: string): Promise<string> {
    let user = await this.repository.findOne({ where: { email: email } });
    console.log(email);
    if (!user) {
      throw new Error("User not found");
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const payload: Payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
      return token;
    }
    throw new Error("Invalid password");
  }

  async updateUser(id: number, userDto: UpdateUserDto): Promise<User> {
    let user = await this.repository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("User not found");
    }
    if(userDto.password){
      userDto.password = await bcrypt.hash(userDto.password, this.saltOrRounds);
    }
    user = Object.assign(user, userDto);
    return await this.repository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    let user = await this.repository.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
