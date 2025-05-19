import Joi from 'joi';

const createCollectionSchema = Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().allow(null, ''),
    image: Joi.string().allow(null, ''),
    isActive: Joi.boolean().default(true),
    categoryId: Joi.string().required(),
    shopId: Joi.string().required()
});

const updateCollectionSchema = Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().allow(null, ''),
    image: Joi.string().allow(null, ''),
    isActive: Joi.boolean(),
    categoryId: Joi.string()
});

export const validateCreate = (req, res, next) => {
    const { error } = createCollectionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const validateUpdate = (req, res, next) => {
    const { error } = updateCollectionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};