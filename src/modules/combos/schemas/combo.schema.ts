import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Product } from "src/modules/products/schemas";

export type ComboDocument = HydratedDocument<Combo>;

@Schema({ timestamps: true })
export class Combo {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true })
  discount: number;

  @Prop({ type: Number, required: false })
  finalAmount: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }], required: true })
  products: Types.ObjectId[];

  @Prop({ type: String, required: false })
  url_image: string;

  @Prop({ type: Boolean, required: true })
  status: boolean;
}

export const ComboSchema = SchemaFactory.createForClass(Combo);
