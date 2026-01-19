import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateQualiDto {
  @IsNumber()
  @ApiProperty({ description: 'Service rating', example: '5' })
  @Max(5, {message: 'Max score is 5'})
  @Min(1, {message: 'Min score is 1'})
  score: number;

  @ApiProperty({ description: 'brief comment', example: 'This service is awful because it was late' })
  @IsOptional()
  @IsString()
  observation?: string;
}
