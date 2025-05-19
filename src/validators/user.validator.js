import Joi from 'joi';

const signupSchema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    phone: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/)
});

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

export const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};