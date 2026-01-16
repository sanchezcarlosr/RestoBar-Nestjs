import { Module } from "@nestjs/common";
import { StorageModule } from "../common/storages/storage.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schemas";
import { OrderController } from "./controllers";
import { OrderService } from "./services";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Order.name,
            schema: OrderSchema
        }]),
    ],
    controllers: [
        OrderController
    ],
    providers: [
        OrderService
    ],
    exports: [
        OrderService
    ],
})
export class OrderModule { }