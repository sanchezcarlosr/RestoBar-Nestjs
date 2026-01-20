import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/modules/products/schemas';


export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
  product: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  subtotal: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
