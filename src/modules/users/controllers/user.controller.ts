import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDTO } from "../dto";
import { UserResponseDTO } from "../dto/response-user.dto";
import { UserService } from "../services";

@Controller({ path: 'user', version: '1' })
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Get()
    async create(): Promise<any> {
        return this.userService.getUser();
    }
}