import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiStandardResponse } from "src/modules/common";
import { CreateProductDto, ProductResponseDto, UpdateProductDto } from "../dto";
import { ProductService } from "../services/product.service";
import { ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller({ path: 'product', version: '1' })
export class ProductController {

    constructor(private readonly productService: ProductService) {

    }
    @Get()
    @ApiStandardResponse({
        summary: 'Get All Products',
        description: `
            ## Return All products
            - Requires valid authentication
        `,
        type: ProductResponseDto,
        status: 200,
        isArray: true,
    })
    async getAllProducts(): Promise<ProductResponseDto[]> {
        const data = await this.productService.getProducts();
        return data;
    }

    @Get(':id')
    @ApiStandardResponse({
        summary: 'Get Product by id',
        description: `
            Retrieves a product identified by id from the Data Base
        `,
        type: ProductResponseDto,
        status: 200
    })
    async getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
        const data = await this.productService.getProductById(id);
        return data;
    }

    @Post('register')
    @ApiConsumes('multipart/form-data')
    @ApiStandardResponse({
        summary: 'Register a new product',
        description: 'Allos register a new product in the system',
        type: ProductResponseDto,
        status: 200
    })
    @UseInterceptors(FileInterceptor('file'))
    async registerProduct(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: '\.(jpg|jpeg|png|bmp|webp)$',
                })
                .addMaxSizeValidator({
                    maxSize: 1140000,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                }),
        ) file: Express.Multer.File
    ): Promise<ProductResponseDto> {
        const data = await this.productService.registerProduct(createProductDto, file);
        return data;
    }

    @Put('/updateProduct/:id')
    @ApiConsumes('multipart/form-data')
    @ApiStandardResponse({
        summary: 'Update product data',
        description: "Allos update product data",
        type: ProductResponseDto,
        status: 200
    })
    @UseInterceptors(FileInterceptor('file'))
    async updateProduct(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string, @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: '\.(jpg|jpeg|png|bmp|webp)$',
            })
            .addMaxSizeValidator({
                maxSize: 1140000,
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false
            }),
    ) file?: Express.Multer.File): Promise<ProductResponseDto> {
        const data = await this.productService.updateProduct(id, updateProductDto, file);
        return data;
    }

    @Delete(':id')
    @ApiStandardResponse({
        summary: 'Delete product by id',
        description: `
        Allow deleting products from the Data Base
        params: id of the product to be deleted
        `,
        type: ProductResponseDto,
        status: 200
    })
    async deleteProduct(@Param('id') id: string): Promise<ProductResponseDto | null> {
        return await this.productService.deleteProductById(id);
    }
}