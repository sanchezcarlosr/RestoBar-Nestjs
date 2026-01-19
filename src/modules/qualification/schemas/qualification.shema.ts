import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type QualificationDocument = HydratedDocument<Qualification>;

@Schema({ timestamps: true })
export class Qualification {
    @Prop({ type: Number, required: true })
    score: number;

    @Prop({ type: String })
    observation?: string;

    @Prop({ type: Date, required: true, default: Date.now })
    date: Date;
}

export const QualificationSchema = SchemaFactory.createForClass(Qualification);
