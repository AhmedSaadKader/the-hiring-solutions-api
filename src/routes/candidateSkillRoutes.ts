import { Router } from 'express';
import {
  createCandidateSkill,
  deleteCandidateSkill,
  getAllCandidateSkills,
  getCandidateSkill
} from '../controllers/candidateSkillControllers';

const router = Router();

router.get('/', getAllCandidateSkills);

router.get('/:candidateId/:skillId', getCandidateSkill);

router.post('/', createCandidateSkill);

router.delete('/:candidateId/:skillId', deleteCandidateSkill);

export default router;
