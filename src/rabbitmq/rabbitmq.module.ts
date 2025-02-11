import { Module } from '@nestjs/common';
import { RabbitmqController } from './rabbitmq.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SignalModule } from '../signal/signal.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@rabbitmq:5672'],
          queue: 'x-ray',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    SignalModule,
  ],
  providers: [],
  controllers: [RabbitmqController],
})
export class RabbitmqModule {}
