import { Module } from "@nestjs/common";
import { StorageModule } from "../common/storages/storage.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./schemas";
import { OrderController } from "./controllers";
import { OrderService } from "./services";
import { OrderDetailModule } from "../order-details/order-details.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Order.name,
            schema: OrderSchema
        }]),
        OrderDetailModule
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