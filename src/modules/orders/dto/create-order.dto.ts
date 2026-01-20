import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsNumber, Min, IsOptional, IsArray, IsMongoId } from "class-validator";
import { Types } from 'mongoose';
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
    @ApiProperty({ description: 'Total amount of the order', required: false})
    total: number;

    @IsString()
    @MinLength(3, { message: 'Payment Method must be at least 3 characters long' })
    @ApiProperty({ description: 'Payment method used for the order', example: 'Credit Card' })
    paymentMethod: string;

    @ApiProperty({ example: '60f7c2f9b4d1a72f9c8e4a12', description: 'User ID reference' })
    @IsMongoId()
    userId: Types.ObjectId;

    @IsArray()
    @ApiProperty({
        description: 'List of product IDs included in the offer',
        example: ['696d2f8ebeef667011ee9476', '696d2f8ebeef667011ee9476'],
        isArray: true,
    })
    orderDetails: Types.ObjectId[];
}
