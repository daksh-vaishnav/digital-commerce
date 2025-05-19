import Joi from 'joi';

// Validation schemas
export const orderSchema = Joi.object({
    customerId: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().integer().min(1).required(),
            price: Joi.number().min(0).required()
        })
    ).required(),
    shippingAddress: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        zipCode: Joi.string().required()
    }).required(),
    paymentMethod: Joi.string().required(),
    status: Joi.string().valid('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED').default('PENDING')
});

export const validateCreate = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

