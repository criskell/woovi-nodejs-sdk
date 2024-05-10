import type {
  PreRegistrationPayload,
  PreRegistrationUser,
} from '../commonTypes';

export type CreatePayload = {
  preRegistration: PreRegistrationPayload & { website?: string };
  user: PreRegistrationUser;
};

export type CreateResponse = {
  preRegistration: PreRegistrationPayload & { website?: string };
  user: PreRegistrationUser;
};
