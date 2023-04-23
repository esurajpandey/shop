import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'
import { DeliveryStatus, OrderStatus } from '@prisma/client';
import payementLink from '../../../utils/helper/payementLink.js';

export default async (req, reply) => {
    try {
        const link = await orderTransaction(req);
        console.log(link);
        reply.code(200).send(successResponse(link, "Order is pending please do payment to confirm"));
    } catch (err) {
        console.log(err.message);
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}


const orderTransaction = async (req) => {
    return await prisma.$transaction(async tx => {
        const { productId, payementMode } = req.body;
        const userId = req.requestContext.get('userId');

        const user = await tx.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                address: true,
                name: true,
                email: true,
                mobile: true,
            }
        });

        const product = await tx.product.findUnique({
            where: {
                id: productId
            },
            select: {
                id: true,
                name: true,
                shopId: true,
                unitPrice: true,
                quantityInStock: true,
            }
        });

        if (product.quantityInStock < 1)
            throw { msg: "Sorry! Product is not availabe.", status: 422 };


        const order = await tx.order.create({
            data: {
                deliveryStatus: DeliveryStatus.ORDERED,
                orderStatus: OrderStatus.INITIATED,
                payment_mode: payementMode,
                amount: product.unitPrice,
                user: {
                    connect: {
                        id: user.id
                    }
                },
                address: {
                    connect: {
                        id: user.address.id
                    }
                },
                shop: {
                    connect: {
                        id: product.shopId
                    }
                }
            }
        });

        if (!order)
            throw { msg: "Unable to order now", status: 422 };


        const orderItems = await tx.orderItem.create({
            data: {
                quantity: 1,
                unitPrice: product.unitPrice,
                orderId: order.id,
                productId: product.id
            }
        });

        const link = await payementLink(order.id, order.amount, user);
        return link;
    })
}