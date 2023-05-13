import client from '../../init/db.js'
import { successResponse, errorResponse } from '../../utils/helper/response.js'
export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");
        const wishlist = await client.wishlist.findMany({
            where: {
                userId
            },
            select: {
                addedAt: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        quantityInStock: true,
                        brand: {
                            select: { name: true }
                        },
                        unitPrice: true,
                    }
                }
            }
        });


        if (wishlist.length === 0) {
            throw { msg: "No items in wishlist", status: 404 }
        }
        reply.code(200).send(successResponse(wishlist, "All favorites items"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}