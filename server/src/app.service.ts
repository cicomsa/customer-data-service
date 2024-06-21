import { Injectable } from '@nestjs/common';
import { CustomerData, NextDeliveryData } from './types';
import * as customersData from '../data.json';
import { AppUtils } from './app.utils';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getNextDelivery(customerId: string): NextDeliveryData | undefined {
    const customerData: CustomerData | undefined = customersData.find(
      (data) => data.id === customerId,
    );

    if (!customerData) return;

    const catsWithActiveSubscription = customerData.cats.filter(
      (cat) => cat.subscriptionActive,
    );

    const totalPrice = AppUtils.calculateTotalPrice(catsWithActiveSubscription);

    const catsNames = catsWithActiveSubscription.map((cat) => cat.name);
    const formattedCatsNames = AppUtils.formatCatsNames(catsNames);

    return {
      title: `Your next delivery for ${formattedCatsNames}`,
      message: `Hey ${customerData.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatsNames}'s fresh food.`,
      totalPrice,
      freeGift: totalPrice > 120,
    };
  }
}
