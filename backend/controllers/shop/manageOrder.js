import prisma from '../../init/db.js';
import { errorResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const orderId = req.params.orderId;
        const { deliveryStatus, orderStatus } = req.body;

        const shopId = req.shop.id;

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
                shopId: shopId
            },
            select: {
                id: true,
                orderStatus: true,
                deliveryStatus: true,
            }
        })

        if (!order)
            throw { msg: "Order not found", status: 404 };

        const updatedOrder = await prisma.order.update({
            where: { id: order.id },
            data: {
                deliveryStatus: deliveryStatus,
                orderStatus: orderStatus
            }
        });

        if (!updatedOrder)
            throw { msg: "Unable to update orders", status: 422 };

        reply
            .code(200)
            .send(successResponse(updatedOrder, "Order details is updated"));

    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}


