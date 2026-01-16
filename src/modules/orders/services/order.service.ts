import { InjectModel } from "@nestjs/mongoose";
import { Order } from "../schemas";
import { Model } from "mongoose";
import { plainToInstance } from "class-transformer";
import { NotFoundException } from "@nestjs/common";
import { OrderResponseDto } from "../dto/response-order.dto";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";

export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    ) {}

    async getOrders(): Promise<OrderResponseDto[]> {
        const data = await this.orderModel.find().lean();
        return plainToInstance(OrderResponseDto, data, {
            excludeExtraneousValues: true,
        });
    }

    async getOrderById(id: string): Promise<OrderResponseDto> {
        const orderFound = await this.orderModel.findById(id).lean();
        if (!orderFound) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }
        return plainToInstance(OrderResponseDto, orderFound, {
            excludeExtraneousValues: true,
        });
    }

    async registerOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
        const orderRegistered = await new this.orderModel(createOrderDto).save();
        return plainToInstance(OrderResponseDto, orderRegistered, {
            excludeExtraneousValues: true,
        });
    }

    async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderResponseDto> {
        const updatedOrder = await this.orderModel
            .findByIdAndUpdate(id, { $set: updateOrderDto }, { new: true })
            .exec();
        if (!updatedOrder) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }
        return plainToInstance(OrderResponseDto, updatedOrder, {
            excludeExtraneousValues: true,
        });
    }

    async deleteOrderById(id: string): Promise<OrderResponseDto | null> {
        const orderDeleted = await this.orderModel.findByIdAndDelete(id).lean();
        return plainToInstance(OrderResponseDto, orderDeleted, {
            excludeExtraneousValues: true,
        });
    }
}
