import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiStandardResponse } from "src/modules/common";
import { CreateRestobarDto, RestobarResponseDto } from "../dto";
import { RestobarService } from "../services/restobar.service";

@Controller({ path: "restobar", version: "1" })
export class RestobarController {
    constructor(private readonly restobarService: RestobarService) { }

    @Get()
    @ApiStandardResponse({
        summary: "Get All Restobars",
        description: "Return all restobars",
        type: RestobarResponseDto,
        status: 200,
        isArray: true,
    })
    async getAll(): Promise<RestobarResponseDto[]> {
        return this.restobarService.getAll();
    }

    @Get(":id")
    @ApiStandardResponse({
        summary: "Get Restobar by Id",
        description: "Retrieve a restobar by its id",
        type: RestobarResponseDto,
        status: 200,
    })
    async getById(@Param("id") id: string): Promise<RestobarResponseDto> {
        return this.restobarService.getById(id);
    }

    @Post("register")
    @ApiStandardResponse({
        summary: "Register a new Restobar",
        description: "Allow registering a new restobar in the system",
        type: RestobarResponseDto,
        status: 201,
    })
    async create(@Body() createRestobarDto: CreateRestobarDto): Promise<RestobarResponseDto> {
        return this.restobarService.create(createRestobarDto);
    }

    @Put("update/:id")
    @ApiStandardResponse({
        summary: "Update Restobar data",
        description: "Update restobar information",
        type: RestobarResponseDto,
        status: 200,
    })
    async update(@Param("id") id: string, @Body() updateRestobarDto: Partial<CreateRestobarDto>): Promise<RestobarResponseDto> {
        return this.restobarService.update(id, updateRestobarDto);
    }

    @Delete(":id")
    @ApiStandardResponse({
        summary: "Delete Restobar by Id",
        description: "Delete a restobar from the database",
        type: RestobarResponseDto,
        status: 200,
    })
    async delete(@Param("id") id: string): Promise<RestobarResponseDto | null> {
        return this.restobarService.delete(id);
    }
}