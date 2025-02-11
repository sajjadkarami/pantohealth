import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XRay, XraySchema } from '../schema/x-ray.schema';
import { SignalService } from './signal.service';
import { SignalController } from './signal.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: XRay.name, schema: XraySchema }]),
  ],
  providers: [SignalService],
  exports: [SignalService],
  controllers: [SignalController],
})
export class SignalModule {}
