import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas";
import { Model } from 'mongoose'

export class UserService {

    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {

    }

    async getUser(): Promise<any> {
        return this.userModel.find().lean();
    }
}