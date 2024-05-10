export type CreatePayload = {
  taxID: string;
  value: number;
};

export type CreateResponse = {
  cashback: {
    value: number;
  };

  message: string;
};
