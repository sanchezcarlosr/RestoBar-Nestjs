import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { OrderDetailResponseDto } from "src/modules/order-details/dto";
import { UserResponseDTO } from "src/modules/users/dto/response-user.dto";

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

    @Expose()
    @ApiProperty({
        description: 'List of order details included in the order',
        type: [OrderDetailResponseDto],
    })
    @Type(() => OrderDetailResponseDto)
    orderDetails: OrderDetailResponseDto[];

    @Expose()
    @ApiProperty({
        description: 'User included in the order',
        type: UserResponseDTO,
    })
    @Type(() => UserResponseDTO)
    userId: UserResponseDTO;

    constructor(partial: Partial<OrderResponseDto>) {
        Object.assign(this, partial);
    }
}
