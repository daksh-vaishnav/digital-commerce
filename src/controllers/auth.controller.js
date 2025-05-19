import bcrypt from 'bcrypt';
import { generateToken } from '../utils/token.js';
import { sendEmail } from '../utils/email.js';
import {
    getUserByEmailService,
    createUserService,
    getUserByVerificationTokenService,
    setResetPasswordTokenService,
    updateUserPasswordService,
    verifyEmailService
} from '../services/user.service.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await getUserByEmailService(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = generateToken();

        const user = await createUserService({
            name,
            email,
            password: hashedPassword,
            phone,
            verificationToken
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
        const user = await getUserByEmailService(email);
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

        const user = await getUserByVerificationTokenService(token);
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        await verifyEmailService(user.id);

        res.status(200).json({ message: 'Email verified successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await getUserByEmailService(email);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const resetToken = generateToken(user.id, '1h');
        await setResetPasswordTokenService(user.id, resetToken);

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

        const user = await getUserByResetPasswordTokenService(token);

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired reset token'
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await updateUserPasswordService(user.id, hashedPassword);

        res.status(200).json({ message: 'Password reset successful' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}