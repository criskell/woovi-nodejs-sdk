import type { TaxID } from '@src/clients/commonTypes';

export type CreatePayload = {
  application: {
    name: string;
    type: ApplicationEnumTypePayload;
  };
  taxID: TaxID;
};

export type PartnerApplicationPayload = {
  name: string;
  isActive: boolean;
  type: ApplicationEnumTypePayload;
  clientId: string;
  clientSecret: string;
};

export type ApplicationEnumTypePayload = 'API' | 'PLUGIN' | 'ORACLE';

export type CreateResponse = {
  application: PartnerApplicationPayload;
};
