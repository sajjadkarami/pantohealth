import { Module } from '@nestjs/common';
import { RabbitmqController } from './rabbitmq.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'x-ray',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [],
  controllers: [RabbitmqController],
})
export class RabbitmqModule {}
