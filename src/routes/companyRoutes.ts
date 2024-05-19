import { Router } from 'express';
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  updateCompany
} from '../controllers/companyControllers';

const router = Router();

router.get('/', getAllCompanies);

router.get('/:id', getCompany);

router.post('/', createCompany);

router.delete('/:id', deleteCompany);

router.patch('/:id', updateCompany);

export default router;
