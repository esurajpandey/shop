import client from '../../init/db.js'
import { successResponse, errorResponse } from '../../utils/helper/response.js'

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");
        const { productId } = req.params;
        const wishlistItem = await client.wishlist.delete({
            where: {
                productId_userId: {
                    userId,
                    productId
                }
            }
        });

        reply.code(200).send(successResponse({}, "Item removed from wishlist"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}