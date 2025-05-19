import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserByIdService = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: userId }
    });
};

export const getUserByEmailService = async (email) => {
    return await prisma.user.findUnique({
        where: { email }
    });
};

export const getUserByVerificationTokenService = async (verificationToken) => {
    return await prisma.user.findFirst({
        where: { verificationToken }
    });
};

export const createUserService = async (userData) => {
    return await prisma.user.create({
        data: userData
    });
};

export const updateUserService = async (userId, userData) => {
    return await prisma.user.update({
        where: { id: userId },
        data: userData
    });
};

export const setResetPasswordTokenService = async (userId, resetToken) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            resetPasswordToken: resetToken,
            resetPasswordExpires: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour
        }
    });
};

export const getUserByResetPasswordTokenService = async (resetPasswordToken) => {
    return await prisma.user.findFirst({
        where: {
            resetPasswordToken,
            resetPasswordExpires: {
                gt: new Date()
            }
        }
    });
};

export const updateUserPasswordService = async (userId, password) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            password,
            resetPasswordToken: null,
            resetPasswordExpires: null
        }
    });
};


export const verifyEmailService = async (userId) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            verified: true,
            verificationToken: null
        }
    });
};
