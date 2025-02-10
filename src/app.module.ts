import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './producer/producer.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { SignalModule } from './signal/signal.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/x-ray'),
    RabbitmqModule,
    SignalModule,
    ProducerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
