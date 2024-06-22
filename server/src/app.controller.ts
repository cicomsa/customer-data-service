import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NextDeliveryDataResponse } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(`/comms/your-next-delivery/:customerId`)
  getNextDelivery(
    @Param('customerId') customerId: string,
  ): NextDeliveryDataResponse | undefined {
    return this.appService.getNextDelivery(customerId);
  }
}
