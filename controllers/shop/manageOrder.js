import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const orderId = req.params.orderId;
        const { deliveryStatus, orderStatus } = req.body;

        console.log({deliveryStatus, orderStatus});
        const shopId = req.requestContext.get("shopId");

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
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
        console.log(err);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}


