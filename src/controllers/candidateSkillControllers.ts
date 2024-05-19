import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { CandidateSkillModel } from '../models/Candidate_skill';

const candidateSkill = new CandidateSkillModel();

export const getAllCandidateSkills = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allCandidateSkills = await candidateSkill.index();
    res.json(allCandidateSkills);
  } catch (error) {
    next(error);
  }
};

export const getCandidateSkill = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await candidateSkill.show(
      parseInt(req.params.candidateId),
      parseInt(req.params.skillId)
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createCandidateSkill = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const candidateSkillData = req.body;
  try {
    if (!candidateSkillData.skillId) {
      throw new Error('CandidateSkill skillId is required');
    }
    const newCandidateSkill = await candidateSkill.create(
      parseInt(candidateSkillData.skillId),
      parseInt(candidateSkillData.candidateId)
    );
    res.json(newCandidateSkill);
  } catch (error) {
    next(error);
  }
};

export const deleteCandidateSkill = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await candidateSkill.delete(
      parseInt(req.params.candidateId),
      parseInt(req.params.skillId)
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
