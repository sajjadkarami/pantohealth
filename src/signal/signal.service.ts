import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { XRay } from '../schema/x-ray.schema';
import { Model } from 'mongoose';
import * as util from 'util';
@Injectable()
export class SignalService {
  constructor(@InjectModel(XRay.name) private xrayModel: Model<XRay>) {}
  async create(data) {
    const objectString = util.inspect(data);
    const objectSize = Buffer.byteLength(objectString, 'utf8');
    const deviceId = Object.keys(data)[0];

    const deviceData = data[deviceId];

    const innerData = deviceData.data.map(
      ([time, [XCoordination, YCoordination, speed]]) => ({
        time,
        data: { XCoordination, YCoordination, speed },
      }),
    );

    const xRayObject: XRay = {
      deviceId,
      time: new Date(deviceData.time),
      dataLength: innerData.length,
      dataVolume: objectSize,
      data: innerData,
    };
    console.log(xRayObject);
    const createdXray = new this.xrayModel(xRayObject);
    await createdXray.save();
  }
}
