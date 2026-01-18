import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailResponseDto {

    @ApiProperty({ example: 2, description: 'Quantity of the product in the order detail' })
    @Expose()
    quantity: number;

    @ApiProperty({ example: 200, description: 'Subtotal calculated as quantity * product.price' })
    @Expose()
    subtotal: number;

    constructor(partial: Partial<OrderDetailResponseDto>) {
        Object.assign(this, partial);
    }
}
