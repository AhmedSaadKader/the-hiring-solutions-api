import { NextFunction, Response } from 'express';
import { RequestAuth } from '../../types';
import { SkillModel } from '../models/Skill';

const skill = new SkillModel();

export const getAllSkills = async (
  _req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allSkills = await skill.index();
    res.json(allSkills);
  } catch (error) {
    next(error);
  }
};

export const getSkill = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await skill.show(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const skillData = req.body;
  try {
    if (!skillData.name) {
      throw new Error('Skill name is required');
    }
    const newSkill = await skill.create(skillData);
    res.json(newSkill);
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await skill.delete(parseInt(req.params.id));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await skill.show(parseInt(req.params.id));
    const newName = req.body.name || result.name;
    const newSkill = await skill.update(parseInt(req.params.id), newName);
    res.json(newSkill);
  } catch (error) {
    next(error);
  }
};
