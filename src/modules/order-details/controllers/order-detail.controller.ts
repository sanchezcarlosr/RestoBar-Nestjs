import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiStandardResponse } from 'src/modules/common';
import { CreateOrderDetailDto, OrderDetailResponseDto, UpdateOrderDetailDto } from '../dto';
import { OrderDetailService } from '../services/order-detail.service';

@Controller({ path: 'order-detail', version: '1' })
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get()
  @ApiStandardResponse({
    summary: 'Get all OrderDetails',
    description: `
      ## Return all order details
      - Requires valid authentication
    `,
    type: OrderDetailResponseDto,
    status: 200,
    isArray: true,
  })
  async getAllOrderDetails(): Promise<OrderDetailResponseDto[]> {
    return await this.orderDetailService.getOrderDetails();
  }

  @Get(':id')
  @ApiStandardResponse({
    summary: 'Get OrderDetail by id',
    description: `
      Retrieves an order detail identified by id from the database
    `,
    type: OrderDetailResponseDto,
    status: 200,
  })
  async getOrderDetailById(@Param('id') id: string): Promise<OrderDetailResponseDto> {
    return await this.orderDetailService.getOrderDetailById(id);
  }

  @Post('register')
  @ApiStandardResponse({
    summary: 'Register a new OrderDetail',
    description: 'Allows registering a new order detail in the system',
    type: OrderDetailResponseDto,
    status: 200,
  })
  async registerOrderDetail(
    @Body() createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetailResponseDto> {
    return await this.orderDetailService.registerOrderDetail(createOrderDetailDto);
  }

  @Put(':id')
  @ApiStandardResponse({
    summary: 'Update OrderDetail data',
    description: 'Allows updating order detail data',
    type: OrderDetailResponseDto,
    status: 200,
  })
  async updateOrderDetail(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<OrderDetailResponseDto> {
    return await this.orderDetailService.updateOrderDetail(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @ApiStandardResponse({
    summary: 'Delete OrderDetail by id',
    description: `
      Allows deleting order details from the database
      params: id of the order detail to be deleted
    `,
    type: OrderDetailResponseDto,
    status: 200,
  })
  async deleteOrderDetail(@Param('id') id: string): Promise<OrderDetailResponseDto | null> {
    return await this.orderDetailService.deleteOrderDetailById(id);
  }
}
