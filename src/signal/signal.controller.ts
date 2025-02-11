import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SignalService } from './signal.service';
import { CreateSignalDto } from './dto/createSignal';

@Controller('signal')
export class SignalController {
  constructor(private signalService: SignalService) {}

  @Get(':deviceId')
  async find(@Param('deviceId') deviceId) {
    const data = await this.signalService.find(deviceId);
    if (data.length === 0) throw new NotFoundException();
    return data;
  }

  @Get()
  async findAll() {
    const data = await this.signalService.findAll();
    return data;
  }

  @Post()
  async create(@Body() dto: CreateSignalDto) {
    console.log(dto);
    await this.signalService.create(dto);
  }

  @Delete(':deviceId')
  async delete(@Param('deviceId') deviceId: string) {
    await this.signalService.delete(deviceId);
  }
}
