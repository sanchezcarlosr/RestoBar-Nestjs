import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMongoId, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @MinLength(4, { message: 'Username must be at least 4 characters long' })
    @ApiProperty({ description: 'UserName must be unique', example: 'salamander459' })
    username: string;

    @IsString()
    @MinLength(4, { message: 'Username must be at least 4 characters long' })
    @ApiProperty({ description: 'LastName', example: 'John' })
    nombre: string;

    @IsString()
    @MinLength(3, { message: 'Username must be at least 4 characters long' })
    @ApiProperty({ description: 'LastName', example: 'Doe' })
    apellido: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @ApiProperty({
        description: 'Email address of the user',
        example: 'john.doe@example.com',
    })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MaxLength(50)
    @ApiProperty({ description: 'User password', example: 'password123' })
    password: string;

    @IsMongoId({ message: 'The rol ID must be a valid MongoDB ObjectId' })
    @ApiProperty({ description: 'Rol ID' })
    rol: string;

}