import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from './core/config/swagger';
import { UserResponseDTO } from './modules/users/dto/response-user.dto';
import { CategoryResponseDto } from './modules/categories/dto';
import { ProductResponseDto } from './modules/products/dto';
import { OrderResponseDto } from './modules/orders/dto';
import { OrderDetailResponseDto } from './modules/order-details/dto';
import { SaleResponseDato } from './modules/sales/dto';
import { QualiResponseDto } from './modules/qualification/dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  //Swagger
  const {swaggerConfig, swaggerSetupOptions} = getSwaggerConfig();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [
      UserResponseDTO,
      CategoryResponseDto,
      ProductResponseDto,
      OrderResponseDto,
      OrderDetailResponseDto,
      SaleResponseDato,
      QualiResponseDto
    ],
  });
  SwaggerModule.setup('/api/docs', app, document, swaggerSetupOptions);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();