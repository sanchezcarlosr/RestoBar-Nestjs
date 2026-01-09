import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDTO, ['email', 'password'] as const),
){}