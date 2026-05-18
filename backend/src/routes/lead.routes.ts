import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportCSV
} from '../controllers/lead.controller';
import { protect } from '../middleware/auth.middleware';
import { adminOnly } from '../middleware/role.middleware';

const router = Router();

router.use(protect);

router.get('/', getLeads);
router.get('/export', exportCSV);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.delete('/:id', adminOnly, deleteLead);

export default router;