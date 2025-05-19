import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export const getAllOrdersService = async (where, skip, limit, orderBy = { createdAt: 'desc' }) => {
    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            where,
            skip: parseInt(skip),
            take: parseInt(limit),
            include: {
                customer: true,
                items: {
                    include: {
                        product: {
                            include: {
                                images: true,
                                features: true
                            }
                        }
                    }
                }
            },
            orderBy
        }),
        prisma.order.count({ where })
    ]);
    return { orders, total };
};

export const getOrderByIdService = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            customer: true,
            items: {
                include: {
                    product: {
                        include: {
                            images: true,
                            features: true
                        }
                    }
                }
            }
        }
    });
};

export const createOrderService = async (orderData, orderItems) => {
    // Start a transaction to handle both order creation and inventory updates
    return await prisma.$transaction(async (tx) => {
        // Check and update inventory for each item
        for (const item of orderItems) {
            const inventory = await tx.inventoryDetails.findUnique({
                where: { productId: item.productId }
            });

            if (!inventory || inventory.totalStock < item.quantity) {
                throw new Error(`Insufficient stock for product ${item.productId}`);
            }

            // Decrement the inventory
            await tx.inventoryDetails.update({
                where: { productId: item.productId },
                data: {
                    totalStock: inventory.totalStock - item.quantity
                }
            });
        }

        // Create the order after inventory checks pass
        return await tx.order.create({
            data: {
                ...orderData,
                items: {
                    create: orderItems
                }
            },
            include: {
                customer: true,
                items: {
                    include: {
                        product: {
                            include: {
                                images: true,
                                features: true
                            }
                        }
                    }
                }
            }
        });
    });
};

export const updateOrderService = async (orderId, orderData) => {
    return await prisma.order.update({
        where: { id: orderId, isActive: true },
        data: orderData
    });
};
