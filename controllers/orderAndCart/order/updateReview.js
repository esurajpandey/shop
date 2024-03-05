import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'

export default async (req, reply) => {
    try {
        const { reviewId } = req.params;

        const { rating, comment } = req.body;

        const review = await prisma.review.update({
            where: {
                id: reviewId
            },
            data: {
                rating,
                comment
            }
        });

        if (!review)
            throw { msg: "Unable to update review", status: 422 };

        reply.code(200).send(successResponse(review, "Review is updated"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}