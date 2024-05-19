import { Router } from 'express';
import {
  createJobRequirement,
  deleteJobRequirement,
  getAllJobRequirements,
  getJobRequirement
} from '../controllers/jobRequirementsControllers';

const router = Router();

router.get('/', getAllJobRequirements);

router.get('/:skillId/:jobId', getJobRequirement);

router.post('/', createJobRequirement);

router.delete('/:skillId/:jobId', deleteJobRequirement);

export default router;
