import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const page = +(req.query?.page ?? "0");
        const shopId = req.requestContext.get("shopId");
        const { orderStatus, deliveryStatus, paymentMode } = req.query;

        const whereCondition = {};

        if (orderStatus) {
            whereCondition.orderStatus = orderStatus;
        }

        if (deliveryStatus) {
            whereCondition.deliveryStatus = deliveryStatus;
        }

        if (paymentMode) {
            whereCondition.payment_mode = paymentMode
        }

        const orders = await prisma.shop.findUnique({
            where: {
                id: shopId,

            },
            select: {
                orders: {
                    where: whereCondition,
                    take: 7,
                    skip: 7 * page,
                    select: {
                        id: true,
                        orderAt: true,
                        orderStatus: true,
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
                        worker : {
                            select : {
                                id : true,
                                name : true,

                            }
                        }
                    },
                    orderBy : {
                        updatedAt : "asc"
                    }
                },
                _count: {
                    select: {
                        orders: true
                    }
                },
                
            }
        })


        if (orders.orders.length === 0)
            throw { msg: "No order found", status: 404 };

        reply
            .code(200)
            .send(successResponse(orders, "Order details"));
    } catch (err) {

        console.log(err);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}