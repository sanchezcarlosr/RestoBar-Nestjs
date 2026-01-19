import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { QualificationService } from "../services/qualification.service";
import { CreateQualiDto, QualiResponseDto, UpdateQualiDto } from "../dto";
import { ApiStandardResponse } from "src/modules/common";

@Controller({ path: "qualification", version: "1" })
export class QualificationController {
    constructor(private readonly qualificationService: QualificationService) { }

    @Get()
    @ApiStandardResponse({
        summary: 'Get All Qualification',
        description: `
              ## Return All qualification
              - Requires valid authentication
          `,
        type: QualiResponseDto,
        status: 200,
        isArray: true,
    })
    async getAll(): Promise<QualiResponseDto[]> {
        const data = await this.qualificationService.getAll();
        return data;
    }

    @Get(":id")
    @ApiStandardResponse({
        summary: 'Get qualification by id',
        description: `
                ## Retrivies qualification by id
                - Retrieves a qualification identified by id from the Data Base
            `,
        type: QualiResponseDto,
        status: 200,
        isArray: true,
    })
    async getById(@Param("id") id: string): Promise<QualiResponseDto> {
        const data = await this.qualificationService.getById(id);
        return data;
    }

    @Post()
    @ApiStandardResponse({
        summary: 'Register a new qualification',
        description: 'Allos register a new qualification in the system',
        type: QualiResponseDto,
        status: 200
    })
    async create(@Body() dto: CreateQualiDto): Promise<QualiResponseDto> {
        const data = await this.qualificationService.create(dto);
        return data;
    }

    @Put(":id")
    @ApiStandardResponse({
        summary: 'Update qualification data',
        description: "Allos update qualification data",
        type: QualiResponseDto,
        status: 200
    })
    async update(@Param("id") id: string, @Body() dto: UpdateQualiDto): Promise<QualiResponseDto> {
        const data = await this.qualificationService.update(id, dto);
        return data;
    }

    @Delete(":id")
    @ApiStandardResponse({
        summary: 'Delete qualification by id',
        description: `
            Allow deleting qualification from the Data Base
            params: id of the qualification to be deleted
            `,
        type: QualiResponseDto,
        status: 200
    })
    async delete(@Param("id") id: string): Promise<QualiResponseDto | null> {
        return await this.qualificationService.delete(id);
    }
}
