import { Cat, pouchSizes } from './types';

export class AppUtils {
  static formatCatsNames(cats: string[]): string {
    if (cats.length > 2) {
      const lastCat = cats.pop();
      return `${cats.join(', ')} and ${lastCat}`;
    }
    return cats.join(' and ');
  }

  static calculateTotalPrice(cats: Cat[]): number {
    const prices = {
      A: 55.5,
      B: 59.5,
      C: 62.75,
      D: 66.0,
      E: 69.0,
      F: 71.25,
    };

    return cats.reduce((acc, cat) => {
      acc += prices[cat.pouchSize as pouchSizes];

      return acc;
    }, 0);
  }
}
