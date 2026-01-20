import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Restobar } from "../schemas/restobar.schema";
import { CreateRestobarDto } from "../dto/create-restobar.dto";
import { plainToInstance } from "class-transformer";
import { RestobarResponseDto } from "../dto";

@Injectable()
export class RestobarService {
    constructor(
        @InjectModel(Restobar.name) private readonly restobarModel: Model<Restobar>,
    ) { }

    async getAll(): Promise<RestobarResponseDto[]> {
        const data = await this.restobarModel.find().lean();
        return plainToInstance(RestobarResponseDto, data, { excludeExtraneousValues: true });
    }

    async getById(id: string): Promise<RestobarResponseDto> {
        const found = await this.restobarModel.findById(id).exec();
        if (!found) throw new NotFoundException(`Restobar with id ${id} not found`);
        return plainToInstance(RestobarResponseDto, found, { excludeExtraneousValues: true });
    }

    async create(createRestobarDto: CreateRestobarDto): Promise<RestobarResponseDto> {
        const created = await new this.restobarModel(createRestobarDto).save();
        return plainToInstance(RestobarResponseDto, created, { excludeExtraneousValues: true });
    }

    async update(id: string, updateRestobarDto: Partial<CreateRestobarDto>): Promise<RestobarResponseDto> {
        const updated = await this.restobarModel.findByIdAndUpdate(id, { $set: updateRestobarDto }, { new: true }).exec();
        if (!updated) throw new NotFoundException(`Restobar with id ${id} not found`);
        return plainToInstance(RestobarResponseDto, updated, { excludeExtraneousValues: true });
    }

    async delete(id: string): Promise<RestobarResponseDto | null> {
        const deleted = await this.restobarModel.findByIdAndDelete(id).lean();
        return plainToInstance(RestobarResponseDto, deleted, { excludeExtraneousValues: true });
    }
}
