import express from 'express';
const router = express.Router();
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { validateSignup, validateLogin } from '../middlewares/validation.js';

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
