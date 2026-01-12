import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class ProductResponseDto {
    @ApiProperty()
    @Expose()
    productName: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    url_image: string;

    @ApiProperty()
    @Expose()
    available: boolean;

    @ApiProperty()
    @Expose()
    price: number;

    @ApiProperty()
    @Expose()
    status: boolean;

    constructor(partial: Partial<ProductResponseDto>){
        Object.assign(this, partial);
    }
}