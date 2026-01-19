import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true })
export class Sale {
    @Prop({ type: Date, required: true, default: Date.now })
    date: Date;
}
export const SaleSchema = SchemaFactory.createForClass(Sale);