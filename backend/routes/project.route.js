import { Router } from 'express';
import { body } from 'express-validator';

import authMiddleware from '../middleware/auth.middleware.js';
import { createProject } from '../controllers/project.controller.js';

const router = Router();
router.post('/create',
    authMiddleware,
    body('name').isString().withMessage('Name is required'),
   createProject
)
export default router;