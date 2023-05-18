import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';

export default async (req, reply) => {


    try {
        const { rating, comment = "", orderId, productId } = req.body;

        if (!rating) {
            throw { msg: "Rating is required", status: 400 }
        }

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
                        rating: parseFloat(rating),
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