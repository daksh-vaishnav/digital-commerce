import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createCategoryService = async (categoryData) => {
    return await prisma.category.create({
        data: categoryData
    });
};

export const getAllCategoriesService = async () => {
    return await prisma.category.findMany({
        where: { isActive: true }
    });
};

export const getCategoryByIdService = async (categoryId) => {
    return await prisma.category.findUnique({
        where: { id: categoryId, isActive: true }
    });
};

export const updateCategoryService = async (categoryId, categoryData) => {
    return await prisma.category.update({
        where: { id: categoryId },
        data: categoryData
    });
};

export const deleteCategoryService = async (categoryId) => {
    return await prisma.category.update({
        where: { id: categoryId },
        data: { isActive: false }
    });
};