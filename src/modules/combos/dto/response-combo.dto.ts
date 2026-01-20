import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ProductResponseDto } from "src/modules/products/dto";

@Exclude()
export class ComboResponseDto {
  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  discount: number;

  @Expose()
  @ApiProperty()
  finalAmount: number;

  @Expose()
  @ApiProperty()
  @Type(() => ProductResponseDto)
  products: ProductResponseDto[]; // IDs de productos

  @Expose()
  @ApiProperty()
  url_image: string;

  @Expose()
  @ApiProperty()
  status: boolean;

  constructor(partial: Partial<ComboResponseDto>) {
    Object.assign(this, partial);
  }
}
