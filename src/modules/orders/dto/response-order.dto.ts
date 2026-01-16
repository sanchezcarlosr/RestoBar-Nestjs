import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class OrderResponseDto {
    @ApiProperty()
    @Expose()
    status: string;

    @ApiProperty()
    @Expose()
    delay: string;

    @ApiProperty()
    @Expose()
    modality: string;

    @ApiProperty()
    @Expose()
    total: number;

    @ApiProperty()
    @Expose()
    paymentMethod: string;

    constructor(partial: Partial<OrderResponseDto>) {
        Object.assign(this, partial);
    }
}
