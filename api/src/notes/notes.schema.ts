import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NoteMongo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export type NoteMongoDocument = NoteMongo & Document;
export const NoteSchema = SchemaFactory.createForClass(NoteMongo);
