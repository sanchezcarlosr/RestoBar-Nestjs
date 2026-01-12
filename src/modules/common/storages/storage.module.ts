import { Module } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { CloudinaryModule } from "src/shared/cloudinary/cloudinary.module";

@Module({
    imports: [
        CloudinaryModule
    ],
    providers: [
        StorageService,
    ],
    exports: [
        StorageService,
    ]
})
export class StorageModule{}