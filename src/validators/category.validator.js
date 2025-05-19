import Joi from 'joi';

const createCategorySchema = Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().allow(null),
    image: Joi.string().allow(null),
    isActive: Joi.boolean().default(true),
    shopId: Joi.string().required()
});

const updateCategorySchema = Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().allow(null),
    image: Joi.string().allow(null),
    isActive: Joi.boolean()
});

export const validateCreate = (req, res, next) => {
    const { error } = createCategorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const validateUpdate = (req, res, next) => {
    const { error } = updateCategorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
