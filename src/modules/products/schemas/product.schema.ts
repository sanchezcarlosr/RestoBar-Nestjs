import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: String, required: true })
    productName: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: false })
    url_image: string;

    @Prop({ type: Boolean, required: true , default: true})
    available: boolean;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: Boolean, required: false , default: true})
    status: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);