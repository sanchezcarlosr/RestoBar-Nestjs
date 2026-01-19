import { PartialType } from "@nestjs/swagger";
import { CreateQualiDto } from "./create-qualification.dto";

export class UpdateQualiDto extends PartialType(CreateQualiDto){}