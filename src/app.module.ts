import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } from './core';
import { UserModule } from './modules/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './modules/common/interceptors';
import { AllExceptionFilter } from './modules/common/interceptors/all-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './modules/email/email.module';
import { ProductModule } from './modules/products/products.module';
import { StorageModule } from './modules/common/storages/storage.module';
import { CategoryModule } from './modules/categories/categories.module';
import { OrderModule } from './modules/orders/orders.module';


@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`),
    EventEmitterModule.forRoot(), //Basic Settings
    UserModule,
    ProductModule, 
    CategoryModule,
    OrderModule,
    EmailModule,
    StorageModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    }
  ],
})
export class AppModule { }