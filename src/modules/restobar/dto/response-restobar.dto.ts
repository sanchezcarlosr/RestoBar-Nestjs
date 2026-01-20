import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RestobarResponseDto {
    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    address: string;

    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty()
    phone: string;

    @Expose()
    @ApiProperty({ required: false })
    delivery?: boolean;

    @Expose()
    @ApiProperty({ required: false })
    open?: boolean;

    @Expose()
    @ApiProperty({ required: false })
    status?: boolean;

    constructor(partial: Partial<RestobarResponseDto>) {
        Object.assign(this, partial);
    }
}
