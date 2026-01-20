import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Offer } from "../schemas/offer.schema";
import { CreateOfferDto, UpdateOfferDto, OfferResponseDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { StorageService } from "src/modules/common/storages/storage.service";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name) private readonly offerModel: Model<Offer>,
    private storageService: StorageService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getAll(): Promise<OfferResponseDto[]> {
    const data = await this.offerModel.find().populate("products").lean();
    return plainToInstance(OfferResponseDto, data, { excludeExtraneousValues: true });
  }

  async getById(id: string): Promise<OfferResponseDto> {
    const found = await this.offerModel.findById(id).populate("products").exec();
    if (!found) throw new NotFoundException(`Offer with id ${id} not found`);
    return plainToInstance(OfferResponseDto, found, { excludeExtraneousValues: true });
  }

  async create(createOfferDto: CreateOfferDto, file: Express.Multer.File): Promise<OfferResponseDto> {
    const urlImage = await this.storageService.savePhoto(file, 'offer-image');
    const created = await new this.offerModel({ ...createOfferDto, url_image: urlImage }).save();
    return plainToInstance(OfferResponseDto, created, { excludeExtraneousValues: true });
  }

  async update(id: string, updateOfferDto: UpdateOfferDto, file?: Express.Multer.File): Promise<OfferResponseDto> {
    const updateData: any = { ...updateOfferDto };
    if (file) {
      const urlImage = await this.storageService.savePhoto(file, 'offer-image');
      updateData.url_image = urlImage;
    }
    const updated = await this.offerModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Offer with id ${id} not found`);
    return plainToInstance(OfferResponseDto, updated, { excludeExtraneousValues: true });
  }

  async delete(id: string): Promise<OfferResponseDto | null> {
    const deleted = await this.offerModel.findByIdAndDelete(id).lean();
    if (deleted?.url_image) {
      this.eventEmitter.emit('image.delete', deleted.url_image, 'offer-image');
    }
    return plainToInstance(OfferResponseDto, deleted, { excludeExtraneousValues: true });
  }
}
