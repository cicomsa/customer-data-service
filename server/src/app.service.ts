import { Injectable } from '@nestjs/common';
import { CustomerData, NextDeliveryDataResponse } from './types';
import * as customersData from '../data.json';
import { AppUtils } from './app.utils';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getNextDelivery(customerId: string): NextDeliveryDataResponse {
    const customerData: CustomerData | undefined = customersData.find(
      (data) => data.id === customerId,
    );

    if (!customerData)
      return {
        statusCode: 404,
        body: `Customer data was not found for customer ${customerId}`,
      };

    const catsWithActiveSubscription = customerData.cats.filter(
      (cat) => cat.subscriptionActive,
    );

    const totalPrice = AppUtils.calculateTotalPrice(catsWithActiveSubscription);

    const catsNames = catsWithActiveSubscription.map((cat) => cat.name);
    const formattedCatsNames = AppUtils.formatCatsNames(catsNames);

    const response = {
      title: `Your next delivery for ${formattedCatsNames}`,
      message: `Hey ${customerData.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatsNames}'s fresh food.`,
      totalPrice,
      freeGift: totalPrice > 120,
    };

    return { statusCode: 200, body: JSON.stringify(response) };
  }
}
