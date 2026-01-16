import { Module } from "@nestjs/common";
import { CategoryService } from "./services/categories.service";
import { StorageModule } from "../common/storages/storage.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./schemas";
import { CategoryController } from "./controllers/category.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Category.name,
            schema: CategorySchema
        }]),
        StorageModule
    ],
    controllers: [ CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule { }