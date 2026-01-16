import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsNumber, Min, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsOptional()
    @IsString({ message: 'Status must be a string value' })
    @ApiProperty({ description: 'Status of the order', example: 'Pending' })
    status?: string;

    @IsOptional()
    @IsString({ message: 'Delay must be a string value' })
    @ApiProperty({ description: 'Estimated delay time for the order', example: '30 minutes' })
    delay?: string;

    @IsString()
    @MinLength(3, { message: 'Modality must be at least 3 characters long' })
    @ApiProperty({ description: 'Order modality (e.g., delivery, pickup)', example: 'Delivery' })
    modality: string;

    @IsNumber({}, { message: 'Total must be a number' })
    @Min(0, { message: 'Total must be greater than or equal to 0' })
    @ApiProperty({ description: 'Total amount of the order', example: 49.99 })
    total: number;

    @IsString()
    @MinLength(3, { message: 'Payment Method must be at least 3 characters long' })
    @ApiProperty({ description: 'Payment method used for the order', example: 'Credit Card' })
    paymentMethod: string;
}
