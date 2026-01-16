import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    @Prop({ type: String, required: true })
    categoryName: string;

    @Prop({ type: String, required: true })
    image: string; // URL of an image to display

    @Prop({ type: Boolean, required: true })
    status: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
