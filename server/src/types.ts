export interface NextDeliveryData {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: string;
}

export interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export type PouchSize = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
