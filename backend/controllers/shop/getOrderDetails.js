import prisma from '../../init/db.js';
import { errorResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const orderId = req.params.orderId;

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                address: true,
                worker: true,
                user: true,
                OrderItem: {
                    include: {
                        product: true,
                    }
                }
            }
        })

        if (!order)
            throw { msg: "Order not found", status: 404 };

        reply
            .code(200)
            .send(successResponse(order, "Order details"));

    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}