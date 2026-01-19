import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class QualiResponseDto {
    @ApiProperty()
    @Expose()
    score: number;

    @ApiProperty()
    @Expose()
    observation?: string;

    @ApiProperty()
    @Expose()
    @Transform(({ value }) => {
        return new Date(value).toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", timeZoneName: "short", hour12: false });
    })
    date: Date;
}
