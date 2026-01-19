import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";


export class CreateSaleDto {

    @ApiProperty({ description: 'Current date, does not accept past date', example: "2026-01-05T13:20:00" })
    @IsDateString()
    @IsOptional()
    date: Date;

}