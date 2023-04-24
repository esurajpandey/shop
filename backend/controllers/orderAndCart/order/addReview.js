import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';
import { Rating } from '@prisma/client';
export default async (req, reply) => {
    const rate = {
        1: "ONE",
        2: "TWO",
        3: "THREE",
        4: "FOUR",
        5: "FIVE"
    }

    try {
        const { rating = Rating.ZERO, comment = "", orderId, productId } = req.body;
        const userId = req.requestContext.get('userId');

        const review = await prisma.orderItem.update({
            where: {
                orderId_productId: {
                    orderId,
                    productId
                }
            },
            data: {
                review: {
                    create: {
                        comment,
                        rating: rate[rating],
                        productId
                    }
                }
            },
            select: {
                orderId: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        pictures: true,
                    }
                },
                review: true,
            }
        });

        if (!review)
            throw { msg: "Unable to add review", status: 422 };

        reply.code(200).send(successResponse(review, "Review is added"));

    } catch (err) {
        console.log(err.message);
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}