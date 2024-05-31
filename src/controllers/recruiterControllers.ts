import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { Recruiter, RecruiterModel } from '../models/Recruiter';
import jwt from 'jsonwebtoken';
import { BaseUser } from '../models/Base_model';

const recruiter = new RecruiterModel();

export const getAllRecruiters = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allRecruiters = await recruiter.indexRecruiter();
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
    const result = await recruiter.showRecruiter(parseInt(req.params.id));
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

export const loginRecruiter = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    throw new Error('Please provide all values');
  }
  try {
    const createdRecruiter = await recruiter.authenticate(
      email,
      password,
      recruiter.tableName
    );
    const token = recruiter.generateJWT(createdRecruiter as BaseUser);
    res.json({
      token,
      email: (createdRecruiter as BaseUser).email,
      id: (createdRecruiter as BaseUser).id?.toString(),
      role: (createdRecruiter as BaseUser).role
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteRecruiter = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await recruiter.deleteRecruiter(parseInt(req.params.id));
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
    const result = await recruiter.showRecruiter(parseInt(req.params.id));
    const updatedRecruiter: Recruiter = {
      ...result,
      name: req.body.name || result.name,
      email: req.body.email || result.email,
      password_digest: req.body.password || result.password_digest
    };
    const newRecruiter = await recruiter.update(updatedRecruiter);
    res.json(newRecruiter);
  } catch (error) {
    next(error);
  }
};
