import { Cat, PouchSize } from './types';

export class AppUtils {
  static formatCatsNames(names: string[]): string {
    if (names.length > 2) {
      const lastCat = names.pop();
      return `${names.join(', ')} and ${lastCat}`;
    }
    return names.join(' and ');
  }

  static calculateTotalPrice(cats: Cat[]): number {
    const subscriptionPrices: Record<PouchSize, number> = {
      A: 55.5,
      B: 59.5,
      C: 62.75,
      D: 66.0,
      E: 69.0,
      F: 71.25,
    };

    return cats.reduce((totalPrice: number, cat) => {
      totalPrice += subscriptionPrices[cat.pouchSize as PouchSize];
      return totalPrice;
    }, 0);
  }
}
