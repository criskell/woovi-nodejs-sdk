export type PageInfo = {
  errors: BasicError[];
  skip: number;
  limit: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type BasicError = {
  message: string;
  data: {
    skip: number;
    limit: number;
  };
};

export type TaxID = {
  taxID: string;
  type: string;
};

export type Address = {
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  country: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  taxID: TaxID;
  correlationID: string;
  address: Address;
  dayGenerateCharge: number;
};

export type BasicCustomer = {
  name: string;
  email: string;
  phone: string;
  taxID: string;
  address?: Address;
};

export type AdditionalInfo = {
  key: string;
  value: string;
};
