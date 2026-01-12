import { Module } from "@nestjs/common";
import { StorageModule } from "../common/storages/storage.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/product.schema";
import { ProductController } from "./controllers";
import { ProductService } from "./services";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Product.name,
            schema: ProductSchema
        }]),
        StorageModule
    ],
    controllers: [
        ProductController
    ],
    providers: [
        ProductService
    ],
    exports: [
        ProductService
    ],
})
export class ProductModule { }