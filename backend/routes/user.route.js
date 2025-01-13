import { Router } from 'express';
import * as  userController  from '../controllers/user.controller.js';
import {body } from 'express-validator'
import  authMiddleware  from '../middleware/auth.middleware.js';



const router = Router();
router.post('/register', body('email').isEmail().withMessage('email must be valid'),body('password').isLength({min: 3}).withMessage('password must be more than 3 '),userController.createUserController)

router.post('/login', body('email').isEmail().withMessage('email must be valid'),body('password').isLength({min: 3}).withMessage('password must be more than 3 '),userController.loginUserController)

router.get('/profile',authMiddleware,userController.getUserProfileController)

router.get('/logout',authMiddleware,userController.logoutController)

router.get('/all', authMiddleware, userController.getAllUsersController
    
);

export default router;