import { InjectModel } from "@nestjs/mongoose";
import { Product } from "../schemas";
import { Model } from 'mongoose'
import { StorageService } from "src/modules/common/storages/storage.service";
import { CreateProductDto, ProductResponseDto, UpdateProductDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";


export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>,
        private storageService: StorageService,
        private eventEmmiter: EventEmitter2,
    ) { }

    async getProducts(): Promise<ProductResponseDto[]> {
        const data = await this.productModel.find().lean();
        return plainToInstance(ProductResponseDto, data, {
            excludeExtraneousValues: true
        });
    }

    async getProductById(id: string): Promise<ProductResponseDto> {
        const productFound = await this.productModel.findById(id).lean();
        if (!productFound) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return plainToInstance(ProductResponseDto, productFound, {
            excludeExtraneousValues: true
        });
    }

    async registerProduct(createProduct: CreateProductDto, file: Express.Multer.File): Promise<ProductResponseDto> {
        const urlImage = await this.storageService.savePhoto(file, 'product-image');
        const productRegistered = new this.productModel({ ...createProduct, url_image: urlImage }).save();
        return plainToInstance(ProductResponseDto, productRegistered, {
            excludeExtraneousValues: true,
        });
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto, file?: Express.Multer.File): Promise<ProductResponseDto> {
        const updateData: any = { ...updateProductDto };
        if (file) {
            const urlImage = await this.storageService.savePhoto(file, 'product-image');
            updateData.url_image = urlImage;
        }
        const updateProduct = await this.productModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
        return plainToInstance(ProductResponseDto, updateProduct, {
            excludeExtraneousValues: true,
        });
    }

    async deleteProductById(id: string): Promise<ProductResponseDto | null> {
        const productDeleted = await this.productModel.findByIdAndDelete(id).lean();
        if (productDeleted?.url_image) {
            let url = productDeleted?.url_image;
            const parts = url.split('/');
            const versionAndId = parts.slice(parts.indexOf('upload') + 1).join('/');
            const publicId = versionAndId.replace(/\.[^/.]+$/, ""); // quitar extensión
            console.log(publicId);
            this.eventEmmiter.emit('image.delete', publicId);
        }

        return plainToInstance(ProductResponseDto, productDeleted, {
            excludeExtraneousValues: true
        });
    }
}