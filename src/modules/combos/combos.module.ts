import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Combo, ComboSchema } from "./schemas";
import { ComboController } from "./controllers";
import { ComboService } from "./services";
import { StorageModule } from "../common/storages/storage.module";
import { ProductModule } from "../products/products.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Combo.name,
            schema: ComboSchema
        }]),
        StorageModule,
        ProductModule
    ],
    controllers: [ComboController],
    exports: [ComboService],
    providers: [ComboService]
})
export class ComboModule { }