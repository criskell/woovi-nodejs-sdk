export interface Refund {
  value: number;
  status: 'IN_PROCESSING' | 'REFUNDED' | 'NOT_ACCOMPLISHED';
  correlationID: string;
  refundId: string;
  time: string;
  comment: string;
}
