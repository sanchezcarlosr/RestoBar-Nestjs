import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsBoolean, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MinLength(3, { message: 'Category Name must be at least 3 characters long' })
    @ApiProperty({ description: 'Name of the category', example: 'Pizzas' })
    categoryName: string;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Category image file',
        example: 'beverages.png', 
        required: true
    })
    file: any;

    @IsBoolean({ message: 'Status must be a boolean value' })
    @ApiProperty({ description: 'Status of the category (active/inactive)', example: true , default: true})
    status: boolean;
}
