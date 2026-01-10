import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserResponseDTO } from "../dto/response-user.dto";
import { UserService } from "../services";
import { ApiStandardResponse } from "src/modules/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from 'express';
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

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
    async getAllUsers(): Promise<any> {
        /**
         * Generate a file that encompasses this response in a standardized way for all endpoints
         */
        const data = await this.userService.getUser();
        return data;
    }

    @Post('register')
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