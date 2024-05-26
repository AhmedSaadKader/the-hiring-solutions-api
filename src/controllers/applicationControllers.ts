import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Application, ApplicationModel } from '../models/Application';
import { Roles } from '../models/Roles';

const application = new ApplicationModel();

export const getAllApplications = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allApplications = await application.index();
    res.json(allApplications);
  } catch (error) {
    next(error);
  }
};

export const getUserApplications = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userRole: Roles = req.user!.role as Roles;
    const userId: number = req.user!.id as number;
    const userApplications = await application.showUserApplications(
      userRole,
      userId
    );
    res.json(userApplications);
  } catch (error) {
    next(error);
  }
};

export const getApplication = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await application.show(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const applicationData: Application = req.body;
  try {
    const newApplication = await application.create(applicationData);
    res.json(newApplication);
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await application.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await application.show(parseInt(req.params.id));
    const job_id = req.body.job_id || result.job_id;
    const candidate_id = req.body.candidate_id || result.candidate_id;
    const recruiter_id = req.body.recruiter_id || result.recruiter_id;
    const status = req.body.status || result.status;
    const applied_date = req.body.applied_date || result.applied_date;
    const reviewed_date = req.body.reviewed_date || result.reviewed_date;
    const notes = req.body.notes || result.notes;
    const newApplication = await application.update(
      parseInt(req.params.id),
      job_id,
      candidate_id,
      recruiter_id,
      status,
      applied_date,
      reviewed_date,
      notes
    );
    res.json(newApplication);
  } catch (error) {
    next(error);
  }
};
