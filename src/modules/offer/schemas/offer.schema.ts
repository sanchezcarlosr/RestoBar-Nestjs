import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Product } from "src/modules/products/schemas";

export type OfferDocument = HydratedDocument<Offer>;

@Schema({ timestamps: true })
export class Offer {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: false })
    description?: string;

    @Prop({ type: Boolean, required: true, default: true })
    status: boolean;

    @Prop({ type: [{ type: String }], required: true })
    days: string[];

    @Prop({ type: Date, required: true })
    startDate: Date;

    @Prop({ type: Date, required: true })
    endDate: Date;

    @Prop({ type: String, required: true })
    url_image: string;

    @Prop({ type: Number, required: true })
    price: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }], required: true })
    products: Types.ObjectId[];
}

export const OfferSchema = SchemaFactory.createForClass(Offer);