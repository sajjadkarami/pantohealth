import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SignalService } from '../signal/signal.service';

@Controller('rabbitmq')
export class RabbitmqController {
  constructor(private signalService: SignalService) {}
  @EventPattern(undefined)
  async handleMessage(@Payload() data: any) {
    await this.signalService.create(data);
  }
}
