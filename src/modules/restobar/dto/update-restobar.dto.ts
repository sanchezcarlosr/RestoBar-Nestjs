import { PartialType } from "@nestjs/swagger";
import { CreateRestobarDto } from "./create-restobar.dto";

export class UpdateRestobarDto extends PartialType(CreateRestobarDto){
}