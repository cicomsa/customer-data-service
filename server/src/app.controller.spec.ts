import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NextDeliveryData } from './types';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });

    describe('getNextDelivery', () => {
      it('should return next delivery info when customer data is found', () => {
        const customerId: string = 'ff535484-6880-4653-b06e-89983ecf4ed5';

        const expectedNextDeliveryData: NextDeliveryData = {
          title: 'Your next delivery for Dorian and Ocie',
          message:
            "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
          totalPrice: 134.0,
          freeGift: true,
        };

        expect(appController.getNextDelivery(customerId)).toEqual({
          statusCode: 200,
          body: JSON.stringify(expectedNextDeliveryData),
        });
      });

      it('should return undefined when customer data is not found', () => {
        const customerId: string = 'some-id';

        expect(appController.getNextDelivery(customerId)).toEqual({
          statusCode: 404,
          body: 'Customer data was not found for customer some-id',
        });
      });
    });
  });
});
