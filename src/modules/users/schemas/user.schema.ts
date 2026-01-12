import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, required: true })
    nombre: string;

    @Prop({ type: String, required: true })
    apellido: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: false })
    urlPhoto: string;

    @Prop({ type: Types.ObjectId, ref: 'Rol', required: true })
    rol: Types.ObjectId;

    @Prop({ type: String })
    googleId: string;

    @Prop({ type: Boolean, default: false })
    estado: boolean;

    @Prop({ type: Boolean, default: false })
    validateAccount: boolean; //Lo agregue para indicar si el usuario ingreso un email que exista - Sirve para luego poder limipiar la BD
}

export const UserSchema = SchemaFactory.createForClass(User);