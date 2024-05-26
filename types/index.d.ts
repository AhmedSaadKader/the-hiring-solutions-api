import { Request } from 'express';
import { Roles } from '../src/models/Roles';

type UserPayload = {
  id?: number;
  email?: string;
  role?: Roles;
  iat?: string | number;
};

export interface RequestAuth extends Request {
  user?: UserPayload;
}
