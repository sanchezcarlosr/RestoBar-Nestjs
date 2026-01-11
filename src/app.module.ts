import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } from './core';
import { UserModule } from './modules/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './modules/common/interceptors';
import { AllExceptionFilter } from './modules/common/interceptors/all-exception.filter';
import { CloudinaryModule } from './shared/cloudinary/cloudinary.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './modules/email/email.module';


@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`),
    EventEmitterModule.forRoot(), //Basic Settings
    UserModule, 
    EmailModule
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