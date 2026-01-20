import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RestobarDocument = HydratedDocument<Restobar>;

@Schema({ timestamps: true })
export class Restobar {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Boolean, required: false })
  delivery?: boolean;

  @Prop({ type: Boolean, required: false })
  open?: boolean;

  @Prop({ type: Boolean, required: false })
  status?: boolean;
}

export const RestobarSchema = SchemaFactory.createForClass(Restobar);
