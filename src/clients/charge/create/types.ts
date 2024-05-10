import type { CustomerPayload } from '@src/clients/customer/create/types';

import type { AdditionalInfo } from '@src/clients/commonTypes';
import type { Charge } from '../commonTypes';

export type CreatePayload = {
  correlationID?: string;
  value: number;
  type?: 'DYNAMIC' | 'OVERDUE';
  comment?: string;
  identifier?: string;
  expiresIn?: number;
  expiresDate?: string;
  customer?: CustomerPayload;
  daysForDueDate?: number;
  daysAfterDueDate?: number;
  interests?: {
    value: number;
  };
  fines?: {
    value: number;
  };
  discountSettings?: {
    modality:
      | 'FIXED_VALUE_UNTIL_SPECIFIED_DATE'
      | 'PERCENTAGE_UNTIL_SPECIFIED_DATE';
    discountFixedDate: {
      daysActive: number;
      value: number;
    }[];
  };
  additionalInfo?: AdditionalInfo[];
  enableCashbackPercentage?: boolean;
  enableCashbackExclusivePercentage?: boolean;
};

export type CreateResponse = {
  charge: Charge;
};
