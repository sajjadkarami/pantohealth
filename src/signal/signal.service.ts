import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as util from 'util';
import { XRay } from '../schema/x-ray.schema';
import { CreateSignalDto } from './dto/createSignal';
@Injectable()
export class SignalService {
  async delete(deviceId: string) {
    await this.xrayModel.deleteMany({
      deviceId,
    });
  }
  constructor(@InjectModel(XRay.name) private xrayModel: Model<XRay>) {}

  async find(deviceId) {
    const data = await this.xrayModel.find({
      deviceId,
    });
    return data;
  }

  async findAll() {
    const data = await this.xrayModel.find().sort('time').limit(10);
    return data;
  }

  async createFromSignal(data) {
    const objectString = util.inspect(data);
    const objectSize = Buffer.byteLength(objectString, 'utf8');
    const deviceId = Object.keys(data)[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const deviceData = data[deviceId];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const innerData = deviceData.data.map(
      ([time, [XCoordination, YCoordination, speed]]) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        time,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { XCoordination, YCoordination, speed },
      }),
    );

    const xRayObject: XRay = {
      deviceId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      time: new Date(deviceData.time),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      dataLength: innerData.length,
      dataVolume: objectSize,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: innerData,
    };
    console.log(xRayObject);
    const createdXray = new this.xrayModel(xRayObject);
    await createdXray.save();
  }

  async create(dto: CreateSignalDto) {
    const xRayObject: XRay = {
      deviceId: dto.deviceId,
      time: dto.time,
      data: dto.data,
      dataLength: dto.data.length,
      dataVolume: Buffer.byteLength(JSON.stringify(dto.data), 'utf8'),
    };
    const createdXray = new this.xrayModel(xRayObject);
    await createdXray.save();
    return createdXray;
  }
}
