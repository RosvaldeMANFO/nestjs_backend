import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "Invalid email" })
    @IsNotEmpty({ message: "Email must not be empty" })
    email: string;

    @IsNotEmpty({ message: "Password must not be empty" })
    password: string;
}