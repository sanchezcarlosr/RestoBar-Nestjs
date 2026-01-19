import { InjectModel } from "@nestjs/mongoose";
import { CreateSaleDto, SaleResponseDato, UpdateSaleDto } from "../dto";
import { Sale } from "../schemas";
import { Model, trusted } from "mongoose";
import { plainToInstance } from "class-transformer";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class SaleService {
    constructor(@InjectModel(Sale.name) private readonly saleModel: Model<Sale>) {

    }

    async getSales(): Promise<SaleResponseDato[]> {
        const data = await this.saleModel.find().lean();
        return plainToInstance(SaleResponseDato, data, {
            excludeExtraneousValues: true,
        });
    }

    async getSaleById(id: string): Promise<SaleResponseDato> {
        const saleFound = await this.saleModel.findById(id).lean();
        if (!saleFound) {
            throw new NotFoundException(`Sale with id: ${id} not found`);
        }
        return plainToInstance(SaleResponseDato, saleFound, {
            excludeExtraneousValues: true,
        });
    }

    async registerSale(createSale: CreateSaleDto): Promise<SaleResponseDato> {
        const saleRegistered = await new this.saleModel(createSale).save();
        return plainToInstance(SaleResponseDato, saleRegistered, {
            excludeExtraneousValues: true,
        });
    }

    async updateSale(id: string, updateSaleDto: UpdateSaleDto): Promise<SaleResponseDato> {
        const updateSale = await this.saleModel.findByIdAndUpdate(id, { $set: updateSaleDto }, { new: true }).exec();
        if(!updateSale){
            throw new NotFoundException(`Sale with id: ${id} not found`);
        }
        return plainToInstance(SaleResponseDato, updateSale, {
            excludeExtraneousValues: true,
        });
    }

    async deleteSaleById(id: string): Promise<SaleResponseDato | null>{
        const saleDeleted = await this.saleModel.findByIdAndDelete(id).lean();
        return plainToInstance(SaleResponseDato, saleDeleted, {
            excludeExtraneousValues: true,
        });
    }

}