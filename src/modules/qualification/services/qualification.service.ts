import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { plainToInstance } from "class-transformer";
import { Qualification } from "../schemas";
import { CreateQualiDto, QualiResponseDto, UpdateQualiDto } from "../dto";

@Injectable()
export class QualificationService {
  constructor(
    @InjectModel(Qualification.name)
    private readonly qualificationModel: Model<Qualification>
  ) {}

  async getAll(): Promise<QualiResponseDto[]> {
    const data = await this.qualificationModel.find().lean();
    return plainToInstance(QualiResponseDto, data, { excludeExtraneousValues: true });
  }

  async getById(id: string): Promise<QualiResponseDto> {
    const found = await this.qualificationModel.findById(id).lean();
    if (!found) throw new NotFoundException(`Qualification with id ${id} not found`);
    return plainToInstance(QualiResponseDto, found, { excludeExtraneousValues: true });
  }

  async create(dto: CreateQualiDto): Promise<QualiResponseDto> {
    const created = await new this.qualificationModel(dto).save();
    return plainToInstance(QualiResponseDto, created.toObject(), { excludeExtraneousValues: true });
  }

  async update(id: string, dto: UpdateQualiDto): Promise<QualiResponseDto> {
    const updated = await this.qualificationModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).lean();
    if (!updated) throw new NotFoundException(`Qualification with id ${id} not found`);
    return plainToInstance(QualiResponseDto, updated, { excludeExtraneousValues: true });
  }

  async delete(id: string): Promise<QualiResponseDto | null> {
    const deleted = await this.qualificationModel.findByIdAndDelete(id).lean();
    return plainToInstance(QualiResponseDto, deleted, { excludeExtraneousValues: true });
  }
}
