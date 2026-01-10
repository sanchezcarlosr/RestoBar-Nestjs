import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";

import { CreateUserDTO } from "../dto";
import { UserResponseDTO } from "../dto/response-user.dto";
import { UserService } from "../services";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ApiStandardResponse } from "src/modules/common";
import type { Request, Response } from "express";

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
    async getAllUsers(@Res({ passthrough: true }) res: Response, @Req() req: Request): Promise<any> {
        /**
         * Generate a file that encompasses this response in a standardized way for all endpoints
         */
        const data = await this.userService.getUser();
        return {
            _metadata: {
                statusCode: res.statusCode,
                timestamp: new Date().toISOString(),
                path: req.originalUrl,
            },
            data
        };
    }
}