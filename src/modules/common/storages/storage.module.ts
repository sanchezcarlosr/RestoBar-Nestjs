import { Module } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { CloudinaryModule } from "src/shared/cloudinary/cloudinary.module";
import { StorageListener } from "./storage.listener";

@Module({
    imports: [
        CloudinaryModule
    ],
    providers: [
        StorageService,
        StorageListener
    ],
    exports: [
        StorageService,
    ]
})
export class StorageModule{}