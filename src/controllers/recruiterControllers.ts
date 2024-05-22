import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Recruiter, RecruiterModel } from '../models/Recruiter';
import jwt from 'jsonwebtoken';

const recruiter = new RecruiterModel();

export const getAllRecruiters = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allRecruiters = await recruiter.index();
    res.json(allRecruiters);
  } catch (error) {
    next(error);
  }
};

export const getRecruiter = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await recruiter.show(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createRecruiter = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const recruiterData: Recruiter = req.body;
  try {
    const newRecruiter = await recruiter.create(recruiterData);
    const token = jwt.sign(
      { recruiter: newRecruiter },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    next(error);
  }
};

export const deleteRecruiter = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await recruiter.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateRecruiter = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await recruiter.show(parseInt(req.params.id));
    const newName = req.body.name || result.name;
    const newEmail = req.body.email || result.email;
    const newPassword = req.body.password || result.password_digest;
    const newRecruiter = await recruiter.update(
      parseInt(req.params.id),
      newName,
      newEmail,
      newPassword
    );
    res.json(newRecruiter);
  } catch (error) {
    next(error);
  }
};
