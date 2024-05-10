import type { RequireAtLeastOne } from '@utils/types';

export type Customer = {
  name: string;
  taxID?: {
    taxID: string;
    type: string;
  };
  correlationID: string;
  address?: Address;
} & RequireAtLeastOne<{
  email?: string;
  taxID?: string;
  phone?: string;
}>;

export type Address = {
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  country: string;
};
