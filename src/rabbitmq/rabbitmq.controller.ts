import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('rabbitmq')
export class RabbitmqController {
  @EventPattern(undefined)
  handleMessage(@Payload() data: any) {
    console.log(data);
  }
}
