import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as crypto from 'crypto';

@Injectable()
export class ProducerService implements OnModuleInit {
  private client: ClientProxy;
  async onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_URL as string],
        queue: 'x-ray',
        queueOptions: {
          durable: true,
        },
      },
    });

    await this.client.connect().then(() => {
      console.log('MQTT Connected!');
      this.startSimulating();
    });
  }
  // Generate random data for IoT devices using crypto
  simulateIoTDeviceData(deviceId: string) {
    const xray: object = {};
    const data: Array<string> = [];
    xray[deviceId] = {};
    xray[deviceId].data = data;
    const dataLength = Math.floor(Math.random() * 10) + 1; // Random data length between 1 and 10
    xray[deviceId].dataLength = dataLength;
    xray[deviceId].dataVolume = 0;
    xray[deviceId].time = Date.now();
    for (let i = 0; i < dataLength; i++) {
      const time = Date.now(); // Simulate time (1 second interval)

      // Generate random coordinates and speed using crypto
      const XCoordination = this.getRandomFloat(-90, 90); // Random latitude
      const YCoordination = this.getRandomFloat(-180, 180); // Random longitude
      const speed = this.getRandomFloat(0, 3); // Random speed between 0 and 3
      data.push(`${time}, [${XCoordination}, ${YCoordination}, ${speed}]}`);
    }
    return xray;
  }

  // Helper method to generate a random floating point number between min and max
  private getRandomFloat(min: number, max: number): number {
    const randomBuffer = crypto.randomBytes(4);
    const randomInt = randomBuffer.readUInt32BE(0); // 4 bytes to a 32-bit unsigned integer
    return min + (randomInt / 0xffffffff) * (max - min); // Normalize to range [min, max]
  }

  // Simulate IoT device sending data every 10 seconds
  startSimulating() {
    setInterval(() => {
      const deviceId = crypto.randomUUID().toString(); // Random device ID
      const xray = this.simulateIoTDeviceData(deviceId);

      console.log(JSON.stringify(xray, null, 2));
      this.client.emit('x-ray', JSON.stringify(xray));
    }, 5000); // Send data every 5 seconds
  }
}
