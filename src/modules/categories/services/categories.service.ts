import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../schemas";
import { Model } from "mongoose";
import { StorageService } from "src/modules/common/storages/storage.service";
import { CreateCategoryDto, CategoryResponseDto, UpdateCategoryDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

export class CategoryService {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
        private storageService: StorageService,
        private eventEmitter: EventEmitter2,
    ) {}

    async getCategories(): Promise<CategoryResponseDto[]> {
        const data = await this.categoryModel.find().lean();
        return plainToInstance(CategoryResponseDto, data, {
            excludeExtraneousValues: true,
        });
    }

    async getCategoryById(id: string): Promise<CategoryResponseDto> {
        const categoryFound = await this.categoryModel.findById(id).lean();
        if (!categoryFound) {
            throw new NotFoundException(`Category with id: ${id} not found`);
        }
        return plainToInstance(CategoryResponseDto, categoryFound, {
            excludeExtraneousValues: true,
        });
    }

    async registerCategory(createCategoryDto: CreateCategoryDto, file: Express.Multer.File): Promise<CategoryResponseDto> {
        const urlImage = await this.storageService.savePhoto(file, "category-image");
        const categoryRegistered = new this.categoryModel({ ...createCategoryDto, image: urlImage }).save();
        return plainToInstance(CategoryResponseDto, categoryRegistered, {
            excludeExtraneousValues: true,
        });
    }

    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto, file?: Express.Multer.File): Promise<CategoryResponseDto> {
        const updateData: any = { ...updateCategoryDto };
        if (file) {
            const urlImage = await this.storageService.savePhoto(file, "category-image");
            updateData.image = urlImage;
        }
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
        return plainToInstance(CategoryResponseDto, updatedCategory, {
            excludeExtraneousValues: true,
        });
    }

    /**
     * This method obtains the public ID of the image stored in Cloudinary
     */
    async deleteCategoryById(id: string): Promise<CategoryResponseDto | null> {
        const categoryDeleted = await this.categoryModel.findByIdAndDelete(id).lean();
        if (categoryDeleted?.image) {
            this.eventEmitter.emit("image.delete", categoryDeleted.image, 'category-image');
        }
        return plainToInstance(CategoryResponseDto, categoryDeleted, {
            excludeExtraneousValues: true,
        });
    }
}
