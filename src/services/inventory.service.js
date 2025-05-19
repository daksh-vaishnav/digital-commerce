import prisma from '../config/prisma.js';

export const getAllInventoryDetails = async () => {
    return await prisma.inventoryDetails.findMany({
        where: { isActive: true },
        include: {
            product: true,
            inventoryAvailable: true
        }
    });
};

export const getInventoryById = async (id) => {
    return await prisma.inventoryDetails.findUnique({
        where: { id, isActive: true },
        include: { product: true }
    });
};

export const getInventoryByProductId = async (productId) => {
    return await prisma.inventoryDetails.findUnique({
        where: { productId, isActive: true },
        include: { product: true }
    });
};

export const createInventory = async (data) => {
    return await prisma.inventoryDetails.create({
        data,
        include: { product: true }
    });
};

export const updateInventory = async (id, data) => {
    return await prisma.inventoryDetails.update({
        where: { id, isActive: true },
        data,
        include: { product: true }
    });
};

export const deleteInventory = async (id) => {
    return await prisma.inventoryDetails.update({
        where: { id },
        data: { isActive: false }
    });
};

export const updateStock = async (productId, quantity) => {
    return await prisma.inventoryDetails.update({
        where: { productId, isActive: true },
        data: {
            totalStock: {
                increment: quantity
            }
        },
        include: { product: true }
    });
}; 