import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: String, required: false })
    status: string; // estado del pedido

    @Prop({ type: String, required: false })
    delay: string; // demora estimada

    @Prop({ type: String, required: true })
    modality: string; // modalidad (ej: delivery, pickup)

    @Prop({ type: Number, required: true })
    total: number; // total del pedido

    @Prop({ type: String, required: true })
    paymentMethod: string; // forma de pago
}

export const OrderSchema = SchemaFactory.createForClass(Order);