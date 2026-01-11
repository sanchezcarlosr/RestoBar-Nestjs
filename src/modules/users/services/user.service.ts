import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas";
import { Model } from 'mongoose'
import { Inject } from "@nestjs/common";
import { v2 as Cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { EventEmitter2 } from "@nestjs/event-emitter";

export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @Inject('CLOUDINARY') private cloudinary: typeof Cloudinary,
        private eventEmmiter: EventEmitter2,
    ) {

    }

    async getUser(): Promise<any> {
        const data = await this.userModel.findOne({ email: '44877662@fi.unju.edu.ar' }).lean();
        //Ejemplo de un evento escuchando
        this.eventEmmiter.emit('user.registered', { name: 'carlos', email: '44877662@fi.unju.edu.ar' });
        return data;
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
                (error, result: any) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        })
    }
}