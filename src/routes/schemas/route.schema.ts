import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// third-party
import { Document } from 'mongoose';

// project imports
import { statusEnum } from 'src/shared/enum/status.enum';

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true, getters: true },
})
export class Route extends Document {
  @Prop({
    type: String,
    required: true,
    enum: statusEnum,
    default: statusEnum.active,
  })
  status: string;

  @Prop({ type: String, required: true, maxlength: 80 })
  name: string;

  @Prop({ type: Object, required: true })
  origin: {
    name: string;
    lat: number;
    long: number;
  };

  @Prop({ type: Object, required: true })
  destination: {
    name: string;
    lat: number;
    long: number;
  };

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  capacity: number;

  @Prop({ type: String, required: true })
  departureTime: Date;

  @Prop({ type: String, required: true })
  arrivalTime: Date;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
