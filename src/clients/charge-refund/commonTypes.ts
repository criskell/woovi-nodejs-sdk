export type ChargeRefund = {
  value: number;
  status: 'IN_PROCESSING' | 'CONFIRMED' | 'REJECTED';
  correlationID: string;
  endToEndId: string;
  time: string;
  comment: string;
};
