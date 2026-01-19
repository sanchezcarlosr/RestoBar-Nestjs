import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";


export class SaleResponseDato {
    @ApiProperty()
    @Expose()
    @Transform(({ value }) => {
        return new Date(value).toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", timeZoneName: "short", hour12: false});
    })
    date: Date;

    constructor(partial: Partial<SaleResponseDato>) {
        Object.assign(this, partial);
    }
}