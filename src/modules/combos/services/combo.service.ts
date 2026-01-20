import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Combo } from "../schemas/combo.schema";
import { CreateComboDto, UpdateComboDto, ComboResponseDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { StorageService } from "src/modules/common/storages/storage.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { ProductService } from "src/modules/products/services";

@Injectable()
export class ComboService {
  constructor(
    @InjectModel(Combo.name) private readonly comboModel: Model<Combo>,
    private storageService: StorageService,
    private eventEmmiter: EventEmitter2,
    private productService: ProductService
  ) { }

  async getAll(): Promise<ComboResponseDto[]> {
    const data = await this.comboModel.find().populate("products").lean();
    return plainToInstance(ComboResponseDto, data, { excludeExtraneousValues: true });
  }

  async getById(id: string): Promise<ComboResponseDto> {
    const found = await this.comboModel.findById(id).populate("products").exec();
    if (!found) throw new NotFoundException(`Combo with id ${id} not found`);
    return plainToInstance(ComboResponseDto, found, { excludeExtraneousValues: true });
  }

  async create(createComboDto: CreateComboDto, file: Express.Multer.File): Promise<ComboResponseDto> {
    const urlImage = await this.storageService.savePhoto(file, 'combo-image');
    console.log(createComboDto);
    
    let total = 0;

    for (const element of createComboDto.products) {
      const { price } = await this.productService.getProductById(element.toString());
      total += price;
    }
    createComboDto.finalAmount = Math.round(
      total * (1 - createComboDto.discount / 100) * 100
    ) / 100;

    const created = await new this.comboModel({ ...createComboDto, url_image: urlImage }).save();
    return plainToInstance(ComboResponseDto, created, { excludeExtraneousValues: true });
  }

  async update(id: string, updateComboDto: UpdateComboDto, file?: Express.Multer.File): Promise<ComboResponseDto> {
    const updateData: any = { ...updateComboDto };
    if (file) {
      const urlImage = await this.storageService.savePhoto(file, 'combo-image');
      updateData.url_image = urlImage;
    }
    const updateCombo = await this.comboModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
    return plainToInstance(ComboResponseDto, updateCombo, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: string): Promise<ComboResponseDto | null> {
    const deleted = await this.comboModel.findByIdAndDelete(id).lean();
    if (deleted?.url_image) {
      this.eventEmmiter.emit('image.delete', deleted.url_image, 'combo-image');
    }
    return plainToInstance(ComboResponseDto, deleted, { excludeExtraneousValues: true });
  }
}
