import { Request } from 'express';

type UserPayload = {
  id?: number;
  username?: string;
  iat?: string | number;
};

export interface RequestAuth extends Request {
  user?: UserPayload;
}
