import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Sale, SaleSchema } from "./schemas";
import { SaleController } from "./controllers";
import { SaleService } from "./services";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Sale.name,
            schema: SaleSchema
        }]),
    ],
    controllers: [SaleController],
    exports: [SaleService],
    providers: [SaleService]
})
export class SaleModule{}