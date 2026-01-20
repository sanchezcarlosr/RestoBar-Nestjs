import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from "express";
import { ApiStandardResponse } from "src/modules/common";
import { UploadedImage } from "src/modules/common/decorators";
import {
  CreateOfferDto,
  UpdateOfferDto,
  OfferResponseDto,
} from "../dto";
import { OfferService } from "../services/offer.service";

@Controller({ path: "offer", version: "1" })
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  @ApiStandardResponse({
    summary: "Get All Offers",
    description: `
      Return all offers
      ### Details
      - Requires valid authentication
      - Sorted by creation date (DESC)
    `,
    type: OfferResponseDto,
    status: 200,
    isArray: true,
  })
  async getAllOffers(): Promise<OfferResponseDto[]> {
    const data = await this.offerService.getAll();
    return data;
  }

  @Get(":id")
  @ApiStandardResponse({
    summary: "Get Offer by Id",
    description: `
      Retrieves an offer identified by id from the Data Base
    `,
    type: OfferResponseDto,
    status: 200,
  })
  async getOfferById(@Param("id") id: string): Promise<OfferResponseDto> {
    const data = await this.offerService.getById(id);
    return data;
  }

  @Post("register")
  @ApiConsumes("multipart/form-data")
  @ApiStandardResponse({
    summary: "Register a new Offer",
    description: "Allow registering a new offer in the system",
    type: OfferResponseDto,
    status: 201,
  })
  @UseInterceptors(FileInterceptor("url_image"))
  async create(
    @Body() createOfferDto: CreateOfferDto,
    @UploadedImage() file: Express.Multer.File,
  ): Promise<OfferResponseDto> {
    const data = await this.offerService.create(createOfferDto, file);
    return data;
  }

  @Put("update/:id")
  @ApiStandardResponse({
    summary: "Update Offer data",
    description: `
      ## Allow updating offer data
      params: id of the offer to update
    `,
    type: OfferResponseDto,
    status: 200,
  })
  @UseInterceptors(FileInterceptor("url_image"))
  async updateOffer(
    @Param("id") id: string,
    @Body() updateOfferDto: UpdateOfferDto,
    @UploadedImage() file?: Express.Multer.File
  ): Promise<OfferResponseDto> {
    const data = await this.offerService.update(id, updateOfferDto, file);
    return data;
  }

  @Delete(":id")
  @ApiStandardResponse({
    summary: "Delete Offer by Id",
    description: `
      Allow deleting offers from the Data Base
      params: id of the offer to be deleted
    `,
    type: OfferResponseDto,
    status: 200,
  })
  async deleteOffer(@Param("id") id: string): Promise<OfferResponseDto | null> {
    const data = await this.offerService.delete(id);
    return data;
  }
}
