import Joi from 'joi';

const createProductSchema = Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().allow('', null),
    price: Joi.number().required().positive(),
    masterImage: Joi.string().required(),
    collectionId: Joi.string().required().uuid(),
    categoryId: Joi.string().required().uuid(),
    shopId: Joi.string().required().uuid(),
    features: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            value: Joi.string().required()
        })
    ),
    images: Joi.array().items(
        Joi.object({
            url: Joi.string().required(),
            alt: Joi.string()
        })
    )
});

const updateProductSchema = Joi.object({
    name: Joi.string().max(100),
    description: Joi.string().allow('', null),
    price: Joi.number().positive(),
    masterImage: Joi.string(),
    collectionId: Joi.string().uuid(),
    categoryId: Joi.string().uuid(),
    shopId: Joi.string().uuid(),
    isActive: Joi.boolean()
});

const validateCreateProduct = (data) => {
    const { error, value } = createProductSchema.validate(data, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    return value;
};

const validateUpdateProduct = (data) => {
    const { error, value } = updateProductSchema.validate(data, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    return value;
};

export const productValidator = {
    validateCreateProduct,
    validateUpdateProduct
}; 