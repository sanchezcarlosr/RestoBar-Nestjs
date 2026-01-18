import { Module } from "@nestjs/common";
import { OrderDetailController } from "./controllers";
import { OrderDetailService } from "./services";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderDetail, OrderDetailSchema } from "./schemas";
import { ProductModule } from "../products/products.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: OrderDetail.name,
            schema: OrderDetailSchema
        }]),
        ProductModule
    ],
    controllers: [OrderDetailController],
    exports: [OrderDetailService],
    providers: [OrderDetailService]
})
export class OrderDetailModule { }