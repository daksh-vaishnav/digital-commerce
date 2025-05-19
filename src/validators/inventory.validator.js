import Joi from 'joi';

const createInventorySchema = Joi.object({
    productId: Joi.string().required(),
    totalStock: Joi.number().integer().min(0).default(0),
    minStock: Joi.number().integer().min(0).default(0),
    maxStock: Joi.number().integer().min(0).default(1000),
    isActive: Joi.boolean().default(true)
});

const updateInventorySchema = Joi.object({
    totalStock: Joi.number().integer().min(0),
    minStock: Joi.number().integer().min(0),
    maxStock: Joi.number().integer().min(0),
    isActive: Joi.boolean()
});

export const validateCreate = (req, res, next) => {
    const { error } = createInventorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export const validateUpdate = (req, res, next) => {
    const { error } = updateInventorySchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}; 