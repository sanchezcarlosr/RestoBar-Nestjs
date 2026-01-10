import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas";
import { Model } from 'mongoose'
import { Inject } from "@nestjs/common";
import { v2 as Cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject('CLOUDINARY') private cloudinary: typeof Cloudinary
    ) {

    }

    async getUser(): Promise<any> {
        return this.userModel.find().lean();
    }
    /**
     * Ver que hace este codigo
     */
    async savePhoto(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = this.cloudinary.uploader.upload_stream(
                {
                    folder: 'users',
                },
                (error, result:any) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        })
    }
}