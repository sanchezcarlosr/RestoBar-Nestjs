import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { v2 as Cloudinary } from 'cloudinary';
import { StorageService } from './storage.service';

@Injectable()
export class StorageListener {
    constructor(private readonly storageService: StorageService) {

    }

    @OnEvent('image.delete')
    async handleImageDeletedEvent(url_image: string, folder: string) {
        await this.storageService.deletePhoto(url_image, folder);
    }
}