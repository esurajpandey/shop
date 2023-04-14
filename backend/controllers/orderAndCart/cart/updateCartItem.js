import prisma from '../../../init/db.js';
import { successResponse, errorResponse } from '../../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const userId = req.requestContext.get('userId');
        const { productId } = req.params;
        const { quantity } = req.body;

        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (product.quantityInStock < quantity)
            throw { msg: "Oops ! Product is out of stock", status: 400 };

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


        const updatedCart = await prisma.cartItem.update({
            where: {
                userId_productId: {
                    userId,
                    productId,
                }
            },
            data: {
                quantity: quantity
            }
        });

        if (!updatedCart)
            throw { msg: "Unable to update cart item", status: 422 };

        reply.code(200).send(successResponse(updatedCart, "Cart items updated"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}