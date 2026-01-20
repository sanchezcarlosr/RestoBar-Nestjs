import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ProductResponseDto } from "src/modules/products/dto";

@Exclude()
export class OfferResponseDto {
    @Expose()
    @ApiProperty({ description: 'Title of the offer', example: 'Summer Sale' })
    title: string;

    @Expose()
    @ApiProperty({ description: 'Description of the offer', example: 'Discounts on all summer products' })
    description?: string;

    @Expose()
    @ApiProperty({ description: 'Indicates if the offer is active', example: true })
    status: boolean;

    @Expose()
    @ApiProperty({
        description: 'Days of the week when the offer is valid',
        example: ['Monday', 'Wednesday', 'Friday'],
        isArray: true,
    })
    days: string[];

    @Expose()
    @ApiProperty({ description: 'Start date of the offer (ISO 8601)', example: '2026-01-20T00:00:00Z' })
    startDate: Date;

    @Expose()
    @ApiProperty({ description: 'End date of the offer (ISO 8601)', example: '2026-01-31T23:59:59Z' })
    endDate: Date;

    @Expose()
    @ApiProperty({ description: 'Offer image URL', example: 'summer-sale.png' })
    url_image: string;

    @Expose()
    @ApiProperty({ description: 'Price of the offer', example: 49.99 })
    price: number;

    @Expose()
    @ApiProperty({
        description: 'List of products included in the offer',
        type: [ProductResponseDto],
    })
    @Type(() => ProductResponseDto)
    products: ProductResponseDto[];

    constructor(partial: Partial<OfferResponseDto>) {
        Object.assign(this, partial);
    }
}
