import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get('userId');

        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                deliveryStatus: true,
                orderStatus: true,
                payment_mode: true,
                amount: true,
                orderAt: true,
                _count: {
                    select: {
                        OrderItem: true
                    }
                }
            }
        });


        if (orders.length === 0)
            throw { msg: "Order not found", status: 404 };

        reply.code(200).send(successResponse(orders, "All orders"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}