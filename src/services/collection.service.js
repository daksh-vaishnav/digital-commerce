import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createCollectionService = async (collectionData) => {
    return await prisma.collection.create({
        data: collectionData
    });
};

export const getAllCollectionsService = async () => {
    return await prisma.collection.findMany({
        where: { isActive: true }
    });
};

export const getCollectionByIdService = async (collectionId) => {
    return await prisma.collection.findUnique({
        where: { id: collectionId, isActive: true }
    });
};

export const updateCollectionService = async (collectionId, collectionData) => {
    return await prisma.collection.update({
        where: { id: collectionId },
        data: collectionData
    });
};

export const deleteCollectionService = async (collectionId) => {
    return await prisma.collection.update({
        where: { id: collectionId },
        data: { isActive: false }
    });
};