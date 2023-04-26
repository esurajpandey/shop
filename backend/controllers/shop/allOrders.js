import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const page = +(req.query?.page ?? "0");
        const shopId = req.requestContext.get("shopId");

        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
            select: {
                orders: {
                    take: 10,
                    skip: 10 * page,
                    select: {
                        id: true,
                        orderAt: true,
                        status: true,
                        updatedAt: true,
                        deliveryStatus: true,
                        payment_mode: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                mobile: true,
                            }
                        },
                        worker: {
                            select: {
                                id: true,
                                name: true,
                                mobile: true,
                                email: truem
                            }
                        }
                    }
                }
            }
        });

        if (shop.orders.length === 0)
            throw { msg: "No order found", status: 404 };

        reply
            .code(200)
            .send(successResponse(orders, "Order details"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}