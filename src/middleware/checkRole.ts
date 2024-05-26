import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { ApplicationModel } from '../models/Application';

export const checkRole = (roles: string[]) => {
  return (req: RequestAuth, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      return res.status(403).send('Access forbidden: insufficient permissions');
    }
    next();
  };
};

export const checkApplicationOwnershipOrAdmin = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const applicationId = parseInt(req.params.applicationId);
  const applicationModel = new ApplicationModel();

  try {
    const application = await applicationModel.show(applicationId);

    if (
      req.user!.role === 'admin' ||
      (req.user!.role === 'candidate' &&
        req.user!.id === application.candidate_id) ||
      (req.user!.role === 'recruiter' &&
        req.user!.id === application.recruiter_id)
    ) {
      next();
    } else {
      res.status(403).send('Access denied. You do not own this resource.');
    }
  } catch (error) {
    next(error);
  }
};
