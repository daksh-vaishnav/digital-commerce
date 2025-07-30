import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ProductService {
    async createProduct(productData) {
        const {
            name,
            description,
            price,
            masterImage,
            collectionId,
            categoryId,
            shopId,
            features,
            images
        } = productData;

        return await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                masterImage,
                collectionId,
                categoryId,
                shopId,
                features: features ? {
                    create: features
                } : undefined,
                images: images ? {
                    create: images
                } : undefined
            },
            include: {
                features: true,
                images: true,
                collection: true,
                category: true,
                shop: true
            }
        });
    }

    async getAllProducts({ page = 1, limit = 10, categoryId, collectionId, shopId }) {
        const skip = (page - 1) * limit;
        const where = {
            isActive: true,
            ...(categoryId && { categoryId }),
            ...(collectionId && { collectionId }),
            ...(shopId && { shopId })
        };

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip: parseInt(skip),
                take: parseInt(limit),
                include: {
                    features: true,
                    images: true,
                    collection: true,
                    category: true,
                    shop: true
                }
            }),
            prisma.product.count({ where })
        ]);

        return {
            products,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            }
        };
    }

    async getProductById(id) {
        return await prisma.product.findUnique({
            where: { id },
            include: {
                features: true,
                images: true,
                collection: true,
                category: true,
                shop: true
            }
        });
    }

    async updateProduct(id, updateData) {
        const {
            name,
            description,
            price,
            masterImage,
            collectionId,
            categoryId,
            shopId,
            isActive
        } = updateData;

        return await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: price ? parseFloat(price) : undefined,
                masterImage,
                collectionId,
                categoryId,
                shopId,
                isActive
            },
            include: {
                features: true,
                images: true,
                collection: true,
                category: true,
                shop: true
            }
        });
    }

    async deleteProduct(id) {
        return await prisma.product.update({
            where: { id },
            data: { isActive: false }
        });
    }
}

module.exports = new ProductService(); 