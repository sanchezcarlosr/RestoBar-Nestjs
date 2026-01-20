import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNumber, IsBoolean, IsArray, MinLength, Min, Max, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class CreateComboDto {
    @IsString()
    @MinLength(3, { message: 'Combo Name must be at least 3 characters long' })
    @ApiProperty({ description: 'Name of the combo', example: 'Burger + CocaCola' })
    title: string;

    @IsNumber()
    @Min(1)
    @Max(100)
    @ApiProperty({ description: 'Discount for Combo', example: 10 })
    discount: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ description: 'Calculate: discount * products price' , required: false})
    finalAmount: number;

    @ApiProperty({
        description: 'List of product IDs that make up the combo',
        example: ['696d2f8ebeef667011ee9476', '696d2f8ebeef667011ee9476'],
        isArray: true,
    })
    @IsArray()
    products: Types.ObjectId[];

    @IsString()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Combo image file',
        example: 'burger.png'
    })
    url_image: any;

    @IsBoolean({ message: 'Available must be a boolean value' })
    @ApiProperty({ description: 'Indicates if the combo is available', example: true })
    status: boolean;
}
