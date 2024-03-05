import { successResponse, errorResponse } from '../../../../utils/helper/response.js';
import prisma from '../../../../init/db.js';

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");
        const ordersData = prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                orders: {
                    select: {
                        address: true,
                        amount: true,
                        orderAt: true,
                        orderStatus: true,
                        deliveryStatus: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                mobile: true
                            }
                        }
                    }
                }
            }
        })

        reply.code(200).send(successResponse(ordersData.orders, "All Orders"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}