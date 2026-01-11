import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserResponseDTO } from "../dto/response-user.dto";
import { UserService } from "../services";
import { ApiStandardResponse } from "src/modules/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from 'express';
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { CreateUserDTO, UpdateUserDto } from "../dto";
import { ChangePasswordDto } from "../dto/change-password.dto";

@Controller({ path: 'user', version: '1' })
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Get()
    @ApiStandardResponse({
        summary: 'Get All Users',
        description: `
        Retunr All User 
        ### Details
        - Any fillter
        - Requires valid authentication
        - Sorted by creation date (DESC)
        `,
        type: UserResponseDTO,
        status: 200,
        isArray: true,
    })
    async getAllUsers(): Promise<UserResponseDTO[]> {
        const data = await this.userService.getUser();
        return data;
    }
    @Get(':email')
    @ApiStandardResponse({
        summary: 'Get user by email',
        description: `
            Retrieves a user identified by email from the Data Base
        `,
        type: UserResponseDTO,
        status: 200
    })
    async getUserByEmail(@Param('email') email: string): Promise<UserResponseDTO>{
        return await this.userService.findUserByEmail(email);
    }

    @Post('register')
    @ApiStandardResponse({
        summary: 'Register a new User',
        description: 'Allow register a new user in the system',
        type: UserResponseDTO,
        status: 201,
    })
    async create(@Body() createUserDTO: CreateUserDTO): Promise<UserResponseDTO> {
        return await this.userService.registerUser(createUserDTO);
    }

    @Put('/updateProfile/:email')
    @ApiStandardResponse({
        summary: 'Update data user',
        description: `
            ## Allow Update data user
            params: email of the user to update data
        `,
        type: UserResponseDTO,
        status: 200
    })
    async updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDTO> {
        return await this.userService.updateUser(email, updateUserDto);
    }

    @Patch('/updatePassword/:email')
    @ApiStandardResponse({
        summary: 'Update password if the User',
        description: `
            ## Allow change password of the user by email
            params: email of the user
        `,
        status: 200,
        type: Boolean,
    })
    async updatePassword(
        @Param('email') email: string,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<Boolean> {
        return await this.userService.updatePassword(email, changePasswordDto);
    }

    @Delete(':email')
    @ApiStandardResponse({
        summary: 'Delete user by email',
        description: `
        Allow deleting users from the Data Base
        params: email address of the user to be deleted
        `,
        type: UserResponseDTO,
        status: 200
    })
    async deleteUser(@Param('email') email: string): Promise<UserResponseDTO | null> {
        return await this.userService.deleteUserByEmail(email);
    }


    @Post('register/photo')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
            required: ['file'],
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async registerUser(@UploadedFile() file: Express.Multer.File) {
        const url = await this.userService.savePhoto(file);
    }

}