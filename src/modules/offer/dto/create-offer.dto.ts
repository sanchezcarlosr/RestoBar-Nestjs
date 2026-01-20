import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
    IsString,
    IsNumber,
    IsBoolean,
    IsArray,
    MinLength,
    Min,
    IsOptional,
    IsDate
} from "class-validator";
import { Types } from "mongoose";

export class CreateOfferDto {
    @IsString()
    @MinLength(3, { message: 'Offer title must be at least 3 characters long' })
    @ApiProperty({ description: 'Title of the offer', example: 'Summer Sale' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Description of the offer', example: 'Discounts on all summer products', required: false })
    description?: string;

    @IsBoolean({ message: 'Status must be a boolean value' })
    @ApiProperty({ description: 'Indicates if the offer is active', example: true })
    status: boolean;

    @IsArray()
    @ApiProperty({
        description: 'Days of the week when the offer is valid',
        isArray: true,
    })
    days: string[];

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiProperty({ description: 'Start date of the offer (ISO 8601)', example: '2026-01-20T00:00:00Z' })
    startDate: Date;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiProperty({ description: 'End date of the offer (ISO 8601)', example: '2026-01-31T23:59:59Z' })
    endDate: Date;

    @IsString()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Offer image file',
        example: 'summer-sale.png'
    })
    url_image: any;

    @IsNumber()
    @Min(1)
    @ApiProperty({ description: 'Price of the offer', example: 49.99 })
    price: number;

    @IsArray()
    @ApiProperty({
        description: 'List of product IDs included in the offer',
        example: ['696d2f8ebeef667011ee9476', '696d2f8ebeef667011ee9476'],
        isArray: true,
    })
    products: Types.ObjectId[];
}