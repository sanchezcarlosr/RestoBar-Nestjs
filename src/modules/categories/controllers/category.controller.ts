import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiStandardResponse } from "src/modules/common";
import { CreateCategoryDto, CategoryResponseDto, UpdateCategoryDto } from "../dto";

import { ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CategoryService } from "../services";
import { UploadedImage } from "src/modules/common/decorators";
import { ImageValidationPipe } from "src/modules/common/pipes";

@Controller({ path: 'category', version: '1' })
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiStandardResponse({
        summary: 'Get All Categories',
        description: `
            ## Return all categories
            - Requires valid authentication
        `,
        type: CategoryResponseDto,
        status: 200,
        isArray: true,
    })
    async getAllCategories(): Promise<CategoryResponseDto[]> {
        const data = await this.categoryService.getCategories();
        return data;
    }

    @Get(':id')
    @ApiStandardResponse({
        summary: 'Get Category by id',
        description: `
            Retrieves a category identified by id from the Data Base
        `,
        type: CategoryResponseDto,
        status: 200
    })
    async getCategoryById(@Param('id') id: string): Promise<CategoryResponseDto> {
        const data = await this.categoryService.getCategoryById(id);
        return data;
    }

    @Post('register')
    @ApiConsumes('multipart/form-data')
    @ApiStandardResponse({
        summary: 'Register a new category',
        description: 'Allows registering a new category in the system',
        type: CategoryResponseDto,
        status: 200
    })
    @UseInterceptors(FileInterceptor('file'))
    async registerCategory(
        @Body() createCategoryDto: CreateCategoryDto,
        @UploadedImage() file: Express.Multer.File
    ): Promise<CategoryResponseDto> {
        const data = await this.categoryService.registerCategory(createCategoryDto, file);
        return data;
    }

    @Put('/updateCategory/:id')
    @ApiConsumes('multipart/form-data')
    @ApiStandardResponse({
        summary: 'Update category data',
        description: "Allows updating category data",
        type: CategoryResponseDto,
        status: 200
    })
    @UseInterceptors(FileInterceptor('file'))
    async updateCategory(
        @Body() updateCategoryDto: UpdateCategoryDto,
        @Param('id') id: string,
        @UploadedImage() file?: Express.Multer.File
    ): Promise<CategoryResponseDto> {
        const data = await this.categoryService.updateCategory(id, updateCategoryDto, file);
        return data;
    }

    @Delete(':id')
    @ApiStandardResponse({
        summary: 'Delete category by id',
        description: `
        Allows deleting categories from the Data Base
        params: id of the category to be deleted
        `,
        type: CategoryResponseDto,
        status: 200
    })
    async deleteCategory(@Param('id') id: string): Promise<CategoryResponseDto | null> {
        return await this.categoryService.deleteCategoryById(id);
    }
}
