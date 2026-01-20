import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose'
export class CreateOrderDetailDto {
  @ApiProperty({ example: 2, description: 'Quantity of the product in the order detail' })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: '60f7c2f9b4d1a72f9c8e4a12', description: 'Product ID reference' })
  @IsMongoId()
  product: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  subtotal: number;
}
