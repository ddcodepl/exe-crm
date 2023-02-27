
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, type: String })
        name: string;

    @Prop({ required: true, type: String, unique: true })
        username: string;

    @Prop({ required: true, type: String, unique: true })
        email: string;

    @Prop({ required: true, type: String })
        city: string;

    @Prop({ required: false, type: Date, default: Date.now })
        createdAt?: Date;

    @Prop({ type: Date, default: null })
        deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
