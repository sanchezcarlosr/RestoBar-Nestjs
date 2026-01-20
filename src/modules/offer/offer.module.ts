import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./schemas";
import { OfferController } from "./controllers";
import { OfferService } from "./services";
import { StorageModule } from "../common/storages/storage.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Offer.name,
            schema: OfferSchema
        }]),
        StorageModule
    ],
    controllers: [OfferController],
    providers: [OfferService],
    exports: [OfferService],
})
export class OfferModule { }