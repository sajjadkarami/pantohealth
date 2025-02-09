import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { SignalModule } from './signal/signal.module';
import { SignalService } from './signal/signal.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/x-ray'),
    RabbitmqModule,
    SignalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
