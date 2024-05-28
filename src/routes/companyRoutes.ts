import { Router } from 'express';
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  loginCompany,
  updateCompany
} from '../controllers/companyControllers';
import auth from '../middleware/auth';
import { checkRole } from '../middleware/checkRole';

const router = Router();

router.post('/login', loginCompany);

router.post('/', createCompany);

router.use(auth);

router.get('/', checkRole(['admin']), getAllCompanies);

router.get('/:id', checkRole(['admin']), getCompany);

router.delete('/:id', deleteCompany);

router.patch('/:id', updateCompany);

export default router;
