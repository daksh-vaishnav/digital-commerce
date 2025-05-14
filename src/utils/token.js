import jwt from 'jsonwebtoken';

export const generateToken = (userId, expiresIn = '24h') => {
    try {
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
    } catch (error) {
        console.error('Error generating token: ', error);
        return null;
    }
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error('Error verifying token: ', error);
        return null;
    }
};


