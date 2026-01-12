//import { UuidToString } from '@/module/common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDTO {

    //@UuidToString()
    @ApiProperty()
    @Expose()
    _id: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    nombre: string;

    @ApiProperty()
    @Expose()
    apellido: string;

    @ApiProperty()
    @Expose()
    urlPhoto: string;
    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;

    constructor(partial: Partial<UserResponseDTO>) {
        Object.assign(this, partial);
    }
}
