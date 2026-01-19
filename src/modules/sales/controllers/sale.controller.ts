import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SaleService } from "../services";
import { ApiStandardResponse } from "src/modules/common";
import { CreateSaleDto, SaleResponseDato, UpdateSaleDto } from "../dto";

@Controller({path: 'sale', version: '1'})
export class SaleController {

    constructor(private readonly saleService: SaleService) {

    }

    @Get()
    @ApiStandardResponse({
        summary: 'Get All sales',
        description: `
        ## Retunr all sales
         - Requies valid authentication
         - Requires Admin permissions
        `,
        type: SaleResponseDato,
        status: 200,
        isArray: true,
    })
    async getAllSales(): Promise<SaleResponseDato[]> {
        const data = await this.saleService.getSales();
        return data;
    }

    @Get(':id')
    @ApiStandardResponse({
        summary: 'Get Sale by Id',
        description: `
        ## Retrivies an sale identified by id from the data base
        `,
        type: SaleResponseDato,
        status: 200,
        isArray: false,
    })
    async getSaleById(@Param('id') id: string): Promise<SaleResponseDato> {
        const data = await this.saleService.getSaleById(id);
        return data;
    }

    @Post('register')
    @ApiStandardResponse({
        summary: 'Register a new SALE',
        description: 'Allows registering a new SALE in the system',
        type: SaleResponseDato,
        status: 200
    })
    async registerSale(
        @Body() createSaleDto: CreateSaleDto,
    ): Promise<SaleResponseDato> {
        const data = await this.saleService.registerSale(createSaleDto);
        return data;
    }

    @Put('/updateSale/:id')
    @ApiStandardResponse({
        summary: 'Update Sale data',
        description: 'Allows updating sale data',
        type: SaleResponseDato,
        status: 200
    })
    async updateSale(
        @Param('id') id: string,
        @Body() updateSaleDto: UpdateSaleDto,
    ): Promise<SaleResponseDato> {
        const data = await this.saleService.updateSale(id, updateSaleDto);
        return data;
    }

    @Delete(':id')
    @ApiStandardResponse({
        summary: 'Delete sale by id',
        description: `
            Allows deleting sales from the Data Base
            params: id of the sale to be deleted
            `,
        type: SaleResponseDato,
        status: 200
    })
    async deleteOrder(@Param('id') id: string): Promise<SaleResponseDato | null> {
        return await this.saleService.deleteSaleById(id);
    }
}