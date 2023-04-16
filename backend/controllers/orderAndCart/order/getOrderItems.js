import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'

export default async (req, reply) => {
    try {
        const { orderId } = req.params;
        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId
            },
            select: {
                product: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                quantity: true,
                unitPrice: true,
                review: {
                    select: {
                        id: true,
                        comment: true,
                        rating: true,
                        createdAt: true,
                    }
                }
            }
        });


        if (orderItems.length === 0)
            throw { msg: "No item found", status: 404 };

        reply.code(200).send(successResponse(orderItems, "All order items"));

    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}