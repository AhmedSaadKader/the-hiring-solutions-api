import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { JobRequirementModel } from '../models/Job_requirements';

const jobRequirement = new JobRequirementModel();

export const getAllJobRequirements = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allJobRequirements = await jobRequirement.index();
    res.json(allJobRequirements);
  } catch (error) {
    next(error);
  }
};

export const getJobRequirement = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await jobRequirement.show(
      parseInt(req.params.skillId),
      parseInt(req.params.jobId)
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createJobRequirement = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const JobRequirementData = req.body;
  try {
    if (!JobRequirementData.name) {
      throw new Error('JobRequirement name is required');
    }
    const newJobRequirement = await jobRequirement.create(
      parseInt(req.params.skillId),
      parseInt(req.params.jobId)
    );
    res.json(newJobRequirement);
  } catch (error) {
    next(error);
  }
};

export const deleteJobRequirement = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await jobRequirement.delete(
      parseInt(req.params.skillId),
      parseInt(req.params.jobId)
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
