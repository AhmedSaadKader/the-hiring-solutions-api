import { Router } from 'express';
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  getSkill,
  updateSkill
} from '../controllers/skillController';
import auth from '../middleware/auth';

const router = Router();

router.use(auth);

router.get('/', getAllSkills);

router.get('/:id', getSkill);

router.post('/', createSkill);

router.delete('/:id', deleteSkill);

router.patch('/:id', updateSkill);

export default router;
