import client from '../../init/db.js'
import { successResponse, errorResponse } from '../../utils/helper/response.js'

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");
        const { productId } = req.params;
        const product = await client.product.findUnique({ where: { id: productId } });

        if (!product) {
            throw { msg: "Product not found", status: 404 };
        }

        const wishlist = client.wishlist.create({
            data: {
                productId,
                userId
            }
        });

        if (!wishlist) {
            throw { msg: "Unable to add product in wish list", status: 422 }
        }

        reply.code(200).send(successResponse(wishlist, "Product is added in wishlist"))
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}