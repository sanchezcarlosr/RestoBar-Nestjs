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
  CreateComboDto,
  UpdateComboDto,
  ComboResponseDto,
} from "../dto";
import { ComboService } from "../services/combo.service";

@Controller({ path: "combo", version: "1" })
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Get()
  @ApiStandardResponse({
    summary: "Get All Combos",
    description: `
      Return all combos
      ### Details
      - Requires valid authentication
      - Sorted by creation date (DESC)
    `,
    type: ComboResponseDto,
    status: 200,
    isArray: true,
  })
  async getAllCombos(): Promise<ComboResponseDto[]> {
    const data = await this.comboService.getAll();
    return data;
  }

  @Get(":id")
  @ApiStandardResponse({
    summary: "Get Combo by Id",
    description: `
      Retrieves a combo identified by id from the Data Base
    `,
    type: ComboResponseDto,
    status: 200,
  })
  async getComboById(@Param("id") id: string): Promise<ComboResponseDto> {
    const data = await this.comboService.getById(id);
    return data;
  }

  @Post("register")
  @ApiConsumes("multipart/form-data")
  @ApiStandardResponse({
    summary: "Register a new Combo",
    description: "Allow registering a new combo in the system",
    type: ComboResponseDto,
    status: 201,
  })
  @UseInterceptors(FileInterceptor("url_image"))
  async create(
    @Body() createComboDto: CreateComboDto,
    @UploadedImage() file: Express.Multer.File,
  ): Promise<ComboResponseDto> {
    const data = await this.comboService.create(createComboDto, file);
    return data;
  }

  @Put("update/:id")
  @ApiStandardResponse({
    summary: "Update Combo data",
    description: `
      ## Allow updating combo data
      params: id of the combo to update
    `,
    type: ComboResponseDto,
    status: 200,
  })
  @UseInterceptors(FileInterceptor("url_image"))
  async updateCombo(
    @Param("id") id: string,
    @Body() updateComboDto: UpdateComboDto,
    @UploadedImage() file?: Express.Multer.File
  ): Promise<ComboResponseDto> {
    const data = await this.comboService.update(id, updateComboDto, file);
    return data;
  }

  @Delete(":id")
  @ApiStandardResponse({
    summary: "Delete Combo by Id",
    description: `
      Allow deleting combos from the Data Base
      params: id of the combo to be deleted
    `,
    type: ComboResponseDto,
    status: 200,
  })
  async deleteCombo(@Param("id") id: string): Promise<ComboResponseDto | null> {
    const data = await this.comboService.delete(id);
    return data;
  }
}
