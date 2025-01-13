import { Router } from 'express';
import { body } from 'express-validator';

import authMiddleware from '../middleware/auth.middleware.js';
import { addUserToProject, createProject, getAllProject, getProjectById } from '../controllers/project.controller.js';
import authuser from '../middleware/auth.middleware.js';

const router = Router();
router.post('/create',
    authMiddleware,
    body('name').isString().withMessage('Name is required'),
    createProject
)
router.get('/all',
    authMiddleware,
    getAllProject
)
router.put('/add-user',
    authMiddleware,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    addUserToProject
)


router.get('/get-project/:projectId',
    authMiddleware,
    getProjectById

)


export default router;