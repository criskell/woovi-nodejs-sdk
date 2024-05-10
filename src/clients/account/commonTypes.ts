export type Account = {
  accountId: string;
  isDefault: boolean;
  balance: {
    total: number;
    blocked: number;
    available: number;
  };
};
