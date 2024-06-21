import { AppUtils } from './app.utils';

describe('AppUtils', () => {
  describe('formatCatsNames', () => {
    it.each`
      catsNames                   | expectedFormattedCatsNames
      ${['cat']}                  | ${'cat'}
      ${['cat1', 'cat2']}         | ${'cat1 and cat2'}
      ${['cat1', 'cat2', 'cat3']} | ${'cat1, cat2 and cat3'}
    `(
      'should return cats names',
      ({ catsNames, expectedFormattedCatsNames }) => {
        const formattedCatsNames = AppUtils.formatCatsNames(catsNames);
        expect(formattedCatsNames).toEqual(expectedFormattedCatsNames);
      },
    );
  });

  describe('calculateTotalPrice', () => {
    it('should return total price', () => {
      const cats = [
        {
          name: 'cat1',
          breed: 'breed',
          subscriptionActive: true,
          pouchSize: 'A',
        },
        {
          name: 'cat2',
          breed: 'breed',
          subscriptionActive: true,
          pouchSize: 'B',
        },
      ];
      const totalPrice = AppUtils.calculateTotalPrice(cats);

      expect(totalPrice).toEqual(115.0);
    });
  });
});
