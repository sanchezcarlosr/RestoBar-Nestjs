import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Restobar, RestobarSchema } from "./schemas";
import { RestobarController } from "./controllers";
import { RestobarService } from "./services";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Restobar.name,
            schema: RestobarSchema
        }])
    ],
    controllers: [RestobarController],
    providers: [RestobarService],
    exports: [RestobarService]
})
export class RestobarModule { }