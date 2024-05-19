import { Router } from 'express';
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkill,
  updateSkill
} from '../controllers/skillController';

const router = Router();

router.get('/', getAllSkills);

router.get('/:id', getSkill);

router.post('/', createSkill);

router.delete('/:id', deleteSkill);

router.patch('/:id', updateSkill);

export default router;
