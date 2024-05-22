import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';

const checkRole = (roles: string[]) => {
  return (req: RequestAuth, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      return res.status(403).send('Access forbidden: insufficient permissions');
    }
    next();
  };
};

export default checkRole;
