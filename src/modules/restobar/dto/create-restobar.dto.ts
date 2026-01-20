import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsOptional, MinLength, IsEmail } from "class-validator";

export class CreateRestobarDto {
    @IsString()
    @MinLength(3)
    @ApiProperty({ description: 'Name of the restobar', example: 'La Esquina Bar' })
    name: string;

    @IsString()
    @ApiProperty({ description: 'Address of the restobar', example: '123 Main Street' })
    address: string;

    @IsEmail()
    @ApiProperty({ description: 'Email of the restobar', example: 'contact@laesquina.com' })
    email: string;

    @IsString()
    @ApiProperty({ description: 'Phone number of the restobar', example: '+54 388 1234567' })
    phone: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: 'Indicates if delivery is available', example: true, required: false })
    delivery?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: 'Indicates if the restobar is open', example: true, required: false })
    open?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ description: 'Indicates if the restobar is active', example: true, required: false })
    status?: boolean;
}