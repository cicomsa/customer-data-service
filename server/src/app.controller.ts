import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { NextDeliveryData } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`/comms/your-next-delivery/:id`)
  getNextDelivery(@Param('id') id: string): NextDeliveryData | undefined {
    return this.appService.getNextDelivery(id);
  }
}
