import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: 'RABBITMQ_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://user:password@localhost:5672'],
            queue: 'x-ray',
            queueOptions: {
              durable: true,
            },
          },
        },
      ],
    }),
  ],
  providers: [ProducerService],
})
export class ProducerModule {}
