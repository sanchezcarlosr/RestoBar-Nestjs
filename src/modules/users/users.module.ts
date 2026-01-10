import { Module } from "@nestjs/common";
import { UserController } from "./controllers";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas";
import { UserService } from "./services";
import { CloudinaryModule } from "src/shared/cloudinary/cloudinary.module";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name:User.name,
            schema: UserSchema
        }]),
        CloudinaryModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule{}
