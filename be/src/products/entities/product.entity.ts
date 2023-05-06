import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: number;

  @Prop()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
