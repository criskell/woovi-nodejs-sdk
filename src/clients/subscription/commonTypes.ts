import type { Customer } from '../commonTypes';

export interface Subscription {
  globalID: string;
  value: number;
  customer: Customer;
  dayGenerateCharge: number;
}
