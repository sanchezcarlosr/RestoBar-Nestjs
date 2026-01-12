import { Inject } from "@nestjs/common";
import { v2 as Cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

export class StorageService {
    constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary) {

    }
    async savePhoto(file: Express.Multer.File, nameFolder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = this.cloudinary.uploader.upload_stream(
                {
                    folder: nameFolder,
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