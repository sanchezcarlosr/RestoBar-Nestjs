import { Module } from "@nestjs/common";
import { UserController } from "./controllers";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas";
import { PasswordService, UserService } from "./services";
import { StorageModule } from "../common/storages/storage.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name:User.name,
            schema: UserSchema
        }]),
        StorageModule
    ],
    controllers: [UserController],
    providers: [UserService, PasswordService],
    exports: [UserService],
})

export class UserModule{}
