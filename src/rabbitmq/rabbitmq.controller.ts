import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignalService } from '../signal/signal.service';

@Controller('rabbitmq')
export class RabbitmqController {
  constructor(private signalService: SignalService) {}
  @MessagePattern('x-ray')
  async handleMessage(@Payload() data: any) {
    console.log('here');
    try {
      await this.signalService.createFromSignal(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  }
}
