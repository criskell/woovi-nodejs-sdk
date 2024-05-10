export type SubAccount = {
  name: string;
  pixKey: string;
  balance: number;
};

export type Account = {
  account: {
    status: string;
    value: number;
    correlationID: string;
    destinationAlias: string;
    comment: string;
  };
};
