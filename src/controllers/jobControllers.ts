import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Job, JobModel } from '../models/Job';
import jwt from 'jsonwebtoken';

const job = new JobModel();

export const getAllJobs = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allJobs = await job.index();
    res.json(allJobs);
  } catch (error) {
    next(error);
  }
};

export const getJob = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await job.show(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const JobData: Job = req.body;
  try {
    // try {
    //   jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
    // } catch (err) {
    //   res.status(401);
    //   res.json(`Invalid token ${err}`);
    //   return;
    // }
    const newJob = await job.create(JobData);
    res.json(newJob);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await job.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await job.show(parseInt(req.params.id));
    const company_id = req.body.company_id || result.company_id;
    const title = req.body.title || result.title;
    const description = req.body.description || result.description;
    const salary = req.body.salary || result.salary;
    const location = req.body.location || result.location;
    const posted_date = req.body.posted_date || result.posted_date;
    const status = req.body.status || result.status;
    const newJob = await job.update(
      parseInt(req.params.id),
      company_id,
      title,
      description,
      salary,
      location,
      status
    );
    res.json(newJob);
  } catch (error) {
    next(error);
  }
};
