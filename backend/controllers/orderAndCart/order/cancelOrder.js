import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'
import { DeliveryStatus, OrderStatus } from '@prisma/client';
export default async (req, reply) => {
    try {
        const { orderId } = req.params;

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            select: {
                id: true,
                deliveryStatus: true
            }
        });

        if (!order) {
            throw { msg: "Order not found", status: 404 };
        }


        if (order.deliveryStatus === DeliveryStatus.DELIVERED)
            throw { msg: "Order is already delivered", status: 400 };

        if (order.deliveryStatus === DeliveryStatus.SHIPPED || order.deliveryStatus === DeliveryStatus.OUT_FOR_DELIVERY) {
            throw { msg: "Order is already shipped or out for delivery,can't be cancel", status: 400 };
        }

        //update
        const canceledOrder = await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                orderStatus: OrderStatus.CANCELED,
                deliveryStatus: DeliveryStatus.CANCELED
            }
        });

        if (!canceledOrder) {
            throw { msg: "Unable to cancel order", status: 422 };
        }
        reply.code(200).send(successResponse(canceledOrder, "Order is cancelled successfully,refund is initizatited!"));
        //payment refund is pending
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}