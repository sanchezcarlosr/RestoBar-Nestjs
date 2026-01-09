import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } from './core';
import { UserModule } from './modules/users/users.module';


@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }