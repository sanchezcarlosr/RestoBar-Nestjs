import {
    Injectable,
    HttpStatus,
    PipeTransform,
} from '@nestjs/common';
import { ParseFilePipeBuilder } from '@nestjs/common';
/**
 * This pipeline allows us to apply the strategy pattern because we can change the image validation to another file 
 */
@Injectable()
export class ImageValidationPipe implements PipeTransform {
    private readonly pipe;

    constructor() {
        this.pipe = new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: '\.(jpg|jpeg|png|bmp|webp)$',
            })
            .addMaxSizeValidator({
                maxSize: 1140000,
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false
            });
    }

    async transform(value: Express.Multer.File) {
        return this.pipe.transform(value);
    }
}