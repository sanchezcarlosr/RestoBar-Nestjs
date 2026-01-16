import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CategoryResponseDto {
    @ApiProperty()
    @Expose()
    categoryName: string;

    @ApiProperty()
    @Expose()
    image: string;

    @ApiProperty()
    @Expose()
    status: boolean;
    
    constructor(partial: Partial<CategoryResponseDto>){
        Object.assign(this, partial);
    }

}