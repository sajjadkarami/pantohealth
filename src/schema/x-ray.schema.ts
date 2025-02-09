import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class XRay {
  @Prop()
  deviceId: string;

  @Prop()
  time: Date;

  @Prop()
  dataLength: number;

  @Prop()
  dataVolume: number;

  @Prop()
  data: {
    time: number;
    data: { XConrdination: number; YCordination: number; speed: number };
  }[];
}

export const XraySchema = SchemaFactory.createForClass(XRay);
