import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Qualification, QualificationSchema } from "./schemas";
import { QualificationController } from "./controllers";
import { QualificationService } from "./services";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Qualification.name,
            schema: QualificationSchema
        }])
    ],
    controllers: [QualificationController],
    providers: [QualificationService],
    exports: [QualificationService]
})
export class QualiModule { }