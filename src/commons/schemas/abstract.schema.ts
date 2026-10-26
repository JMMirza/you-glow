import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Base extends Document {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const BaseSchema = SchemaFactory.createForClass(Base);

// Define the pre 'findOneAndUpdate' middleware to update the 'updatedAt' field
BaseSchema.pre<Base>('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});
