import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'
export default async (req, reply) => {
    try {
        const { reviewId, orderId, productId } = req.body;
        const userId = req.requestContext.get('userId');


        const review = await prisma.orderItem.update({
            where: {
                orderId_productId: {
                    orderId,
                    productId
                },
            },
            data: {
                reviewId: null
            }
        });

        await prisma.review.delete({ where: { id: reviewId } })
        reply.code(200).send(successResponse(review, "Review is added"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}