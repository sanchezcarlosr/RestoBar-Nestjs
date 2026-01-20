import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/modules/products/dto';

@Exclude()
export class OrderDetailResponseDto {

    @ApiProperty({ example: 2, description: 'Quantity of the product in the order detail' })
    @Expose()
    quantity: number;

    @ApiProperty({ example: 200, description: 'Subtotal calculated as quantity * product.price' })
    @Expose()
    subtotal: number;

    @Expose()
    @ApiProperty({ description: 'Added Product', type: ProductResponseDto })
    @Type(() => ProductResponseDto)
    product: ProductResponseDto;

    constructor(partial: Partial<OrderDetailResponseDto>) {
        Object.assign(this, partial);
    }
}
