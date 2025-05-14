import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/token.js';
import { sendEmail } from '../utils/email.js';

const prisma = new PrismaClient();

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = generateToken();

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                verificationToken
            }
        });

        await sendEmail({
            to: email,
            subject: 'Verify your email',
            html: `
            <p>Click <a href="${process.env.FRONTEND_URL}/auth/verify-email/${verificationToken}">here</a> to verify your email.</p>
            `
        });

        res.status(201).json({
            message: 'User created successfully. Please verify your email.'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// User login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if user is verified
        if (!user.verified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user.id, '24h');

        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// User logout
export const logout = async (req, res) => {
    try {
        // Client-side should remove the token
        // also use for one device login
        // while login store the token in the database
        // while logout delete the token from the database
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Email verification
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await prisma.user.findFirst({
            where: { verificationToken: token }
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                verified: true,
                verificationToken: null
            }
        });

        res.status(200).json({ message: 'Email verified successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const resetToken = generateToken(user.id, '1h');
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour
            }
        });

        await sendEmail({
            to: email,
            subject: 'Reset your password',
            html: `
            <p>Click <a href="${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}">here</a> to reset your password.</p>
            `
        });

        res.status(200).json({
            message: 'Password reset link sent to your email'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Reset password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired reset token'
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null
            }
        });

        res.status(200).json({ message: 'Password reset successful' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}