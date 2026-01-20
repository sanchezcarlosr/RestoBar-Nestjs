import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { OrderDetail } from '../schemas/order-detail.schema';
import { CreateOrderDetailDto, OrderDetailResponseDto, UpdateOrderDetailDto } from '../dto';
import { ProductService } from 'src/modules/products/services';

export class OrderDetailService {
  constructor(
    @InjectModel(OrderDetail.name)
    private readonly orderDetailModel: Model<OrderDetail>,
    private readonly productService: ProductService
  ) {}

  async getOrderDetails(): Promise<OrderDetailResponseDto[]> {
    const data = await this.orderDetailModel.find().populate('product').lean();
    console.log(data);
    
    return plainToInstance(OrderDetailResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  async getOrderDetailById(id: string): Promise<OrderDetailResponseDto> {
    const detailFound = await this.orderDetailModel
      .findById(id)
      .populate('product')
      .lean();

    if (!detailFound) {
      throw new NotFoundException(`OrderDetail with id: ${id} not found`);
    }

    return plainToInstance(OrderDetailResponseDto, detailFound, {
      excludeExtraneousValues: true,
    });
  }

  async registerOrderDetail(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetailResponseDto> {
    const product = await this.productService.getProductById(createOrderDetailDto.product.toString());
    createOrderDetailDto.subtotal = product.price * createOrderDetailDto.quantity;
    const orderDetailRegistered = await new this.orderDetailModel({
      ...createOrderDetailDto,
    }).save();

    return plainToInstance(OrderDetailResponseDto, orderDetailRegistered, {
      excludeExtraneousValues: true,
    });
  }

  async updateOrderDetail(
    id: string,
    updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<OrderDetailResponseDto> {
    const updatedDetail = await this.orderDetailModel
      .findByIdAndUpdate(id, { $set: updateOrderDetailDto }, { new: true })
      .populate('product')
      .exec();

    if (!updatedDetail) {
      throw new NotFoundException(`OrderDetail with id: ${id} not found`);
    }

    return plainToInstance(OrderDetailResponseDto, updatedDetail, {
      excludeExtraneousValues: true,
    });
  }

  async deleteOrderDetailById(id: string): Promise<OrderDetailResponseDto | null> {
    const detailDeleted = await this.orderDetailModel.findByIdAndDelete(id).lean();
    return plainToInstance(OrderDetailResponseDto, detailDeleted, {
      excludeExtraneousValues: true,
    });
  }
}
