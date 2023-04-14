import { errorResponse, successResponse } from '../../../utils/helper/response.js';
import prisma from '../../../init/db.js';

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get('userId');

        const cartItems = await prisma.cartItem.findMany({
            where: {
                userId: userId
            },
            select: {
                product: {
                    select: {
                        id: true,
                        pictures: true,
                        brand: true,
                        name: true,
                    }
                },
                quantity: true,
                unitPrice: true,
                createdAt: true,
            }
        });

        reply.code(200).send(successResponse(cartItems, "cart details"));
    } catch (err) {
        console.log(err.message);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}