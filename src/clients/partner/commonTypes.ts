import type { TaxID } from '../commonTypes';

export type PreRegistration = {
  preRegistration: PreRegistrationPayload;
  user: PreRegistrationUser;
  account: PreRegistrationAccount;
  company: PreRegistrationCompanyPayload;
};

export type PreRegistrationUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type PreRegistrationPayload = {
  name: string;
  taxID: TaxID;
};

export type PreRegistrationCompanyPayload = {
  id: string;
  name: string;
  taxID: TaxID;
};

export type PreRegistrationAccount = {
  clientId: string;
};
