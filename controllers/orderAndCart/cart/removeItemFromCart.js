import prisma from '../../../init/db.js';
import { successResponse, errorResponse } from '../../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get('userId');
        const { productId } = req.params;

        const item = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    productId,
                    userId
                }
            }
        });

        if (!item) {
            throw { msg: "Item not found in cart", status: 400 };
        }

        const deletedCart = await prisma.cartItem.delete({
            where: {
                userId_productId: {
                    productId,
                    userId
                }
            }
        });

        reply.code(200).send(successResponse(deletedCart, "Item removed from Cart"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}