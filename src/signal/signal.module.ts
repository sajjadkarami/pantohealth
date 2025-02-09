import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XRay, XraySchema } from '../schema/x-ray.schema';
import { SignalService } from './signal.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: XRay.name, schema: XraySchema }]),
  ],
  providers: [SignalService],
  exports: [SignalService],
})
export class SignalModule {}
