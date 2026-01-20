import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";


@Exclude()
export class ProductResponseDto {
    
    @Expose()
    @Transform(({ obj }) => obj._id?.toString())
    _id: string;

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

    constructor(partial: Partial<ProductResponseDto>) {
        Object.assign(this, partial);
    }
}