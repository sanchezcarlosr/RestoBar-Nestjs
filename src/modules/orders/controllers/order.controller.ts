import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiStandardResponse } from "src/modules/common";
import { OrderService } from "../services/order.service";
import { CreateOrderDto, OrderResponseDto, UpdateOrderDto } from "../dto";


@Controller({ path: 'order', version: '1' })
export class OrderController {

    constructor(private readonly orderService: OrderService) {}

    @Get()
    @ApiStandardResponse({
        summary: 'Get All Orders',
        description: `
            ## Return all orders
            - Requires valid authentication
        `,
        type: OrderResponseDto,
        status: 200,
        isArray: true,
    })
    async getAllOrders(): Promise<OrderResponseDto[]> {
        const data = await this.orderService.getOrders();
        return data;
    }

    @Get(':id')
    @ApiStandardResponse({
        summary: 'Get Order by id',
        description: `
            Retrieves an order identified by id from the Data Base
        `,
        type: OrderResponseDto,
        status: 200
    })
    async getOrderById(@Param('id') id: string): Promise<OrderResponseDto> {
        const data = await this.orderService.getOrderById(id);
        return data;
    }

    @Post('register')
    @ApiStandardResponse({
        summary: 'Register a new order',
        description: 'Allows registering a new order in the system',
        type: OrderResponseDto,
        status: 200
    })
    async registerOrder(
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<OrderResponseDto> {
        const data = await this.orderService.registerOrder(createOrderDto);
        return data;
    }

    @Put('/updateOrder/:id')
    @ApiStandardResponse({
        summary: 'Update order data',
        description: "Allows updating order data",
        type: OrderResponseDto,
        status: 200
    })
    async updateOrder(
        @Body() updateOrderDto: UpdateOrderDto,
        @Param('id') id: string,
    ): Promise<OrderResponseDto> {
        const data = await this.orderService.updateOrder(id, updateOrderDto);
        return data;
    }

    @Delete(':id')
    @ApiStandardResponse({
        summary: 'Delete order by id',
        description: `
        Allows deleting orders from the Data Base
        params: id of the order to be deleted
        `,
        type: OrderResponseDto,
        status: 200
    })
    async deleteOrder(@Param('id') id: string): Promise<OrderResponseDto | null> {
        return await this.orderService.deleteOrderById(id);
    }
}
