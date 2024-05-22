import { Request } from 'express';

type UserPayload = {
  id?: number;
  email?: string;
  role?: string;
  iat?: string | number;
};

export interface RequestAuth extends Request {
  user?: UserPayload;
}
