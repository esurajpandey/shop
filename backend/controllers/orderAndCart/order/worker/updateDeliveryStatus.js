import { successResponse, errorResponse } from '../../../../utils/helper/response.js';
import prisma from '../../../../init/db.js';
import { DeliveryStatus } from '@prisma/client'
export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");
        const { orderId } = req.params;
        const { deliveryStatus } = req.body;


        const order = await prisma.order.findUnique({
            where: { id: orderId },
            select: {
                id: true,
                deliveryStatus: true,
                worker: true
            }
        });

        if (order.worker.id !== userId) {
            throw { msg: "You doesn't have access to this order", status: 401 }
        }

        if (!order) {
            throw { msg: "Order not found", status: 404 };
        }

        if (order.deliveryStatus === DeliveryStatus.DELIVERED) {
            throw { msg: "Order is already delivered", status: 400 };
        }

        if (order.deliveryStatus === DeliveryStatus.CANCELED) {
            throw { msg: "Order is cancelled", status: 400 }
        };

        if (deliveryStatus === DeliveryStatus.CANCELED || deliveryStatus === DeliveryStatus.PACKED) {
            throw { msg: "You can't change status", status: 400 };
        }



        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                deliveryStatus
            }
        });

        reply.code(200).send(successResponse(updatedOrder, "All Orders"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}