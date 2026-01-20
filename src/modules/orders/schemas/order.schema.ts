import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { OrderDetail } from 'src/modules/order-details/schemas';
import { Qualification } from 'src/modules/qualification/schemas';
import { User } from 'src/modules/users/schemas';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: String, required: false })
    status: string; // estado del pedido

    @Prop({ type: String, required: false })
    delay: string; // demora estimada

    @Prop({ type: String, required: true })
    modality: string; // modalidad (ej: delivery, pickup)

    @Prop({ type: Number, required: false })
    total: number; // total del pedido

    @Prop({ type: String, required: true })
    paymentMethod: string; // forma de pago

    //Relationship
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: OrderDetail.name }], require: true })
    orderDetails: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: Qualification.name, required: false })
    quali: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);