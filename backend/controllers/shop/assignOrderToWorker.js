import prisma from "../../init/db.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";
import { OrderStatus, DeliveryStatus, PaymentMode } from '@prisma/client'
export default async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { workerId } = req.body;

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            select: {
                worker: true,
                orderAt: true,
                amount: true,
                deliveryStatus: true,
                orderStatus: true,
                payment_mode: true,
            }
        });

        if (order.orderStatus === OrderStatus.CANCELED || order.orderStatus === OrderStatus.FAILED) {
            throw { msg: `Order is ${order.orderStatus}`, status: 400 };
        }

        if (order.deliveryStatus === DeliveryStatus.SHIPPED) {
            throw { msg: "You can't change the worker for this order", status: 400 };
        }

        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                deliveryStatus: DeliveryStatus.PACKED,
                orderStatus: OrderStatus.CONFIRMED,
                worker: {
                    connect: {
                        id: workerId
                    }
                }
            }
        });

        reply
            .code(200)
            .send(successResponse(updatedOrder, "Order details is updated"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}