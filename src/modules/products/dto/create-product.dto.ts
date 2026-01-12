import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsBoolean, IsNumber, Min, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3, { message: 'Product Name must be at least 3 characters long' })
    @ApiProperty({ description: 'Name of the product', example: 'Burger' })
    productName: string;

    @IsString()
    @MinLength(5, { message: 'Description must be at least 5 characters long' })
    @ApiProperty({ description: 'Detailed description of the product', example: 'Delicious double cheeseburger with fries' })
    description: string;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Product image file',
        example: 'burger.png'
    })
    file: any;

    @IsBoolean({ message: 'Available must be a boolean value' })
    @ApiProperty({ description: 'Indicates if the product is available', example: true })
    available: boolean;

    @IsNumber({}, { message: 'Price must be a number' })
    @Min(0, { message: 'Price must be greater than or equal to 0' })
    @ApiProperty({ description: 'Price of the product', example: 9.99 })
    price: number;

    @IsOptional()
    @IsBoolean({ message: 'Status must be a boolean value' })
    @ApiProperty({ description: 'Status of the product (active/inactive)', example: true })
    status: boolean;
}
