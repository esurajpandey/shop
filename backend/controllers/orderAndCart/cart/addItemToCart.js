import { successResponse, errorResponse } from '../../../utils/helper/response.js';
import prisma from '../../../init/db.js';

export default async (req, reply) => {
    try {
        const cart = await addToCart(req);

        reply.code(200).send(
            successResponse(cart, "Item added to cart")
        );

    } catch (err) {
        console.log(err);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}

const addToCart = async (req) => {
    return prisma.$transaction(async tx => {
        const { productId } = req.params;
        const userId = req.requestContext.get('userId');

        const product = await tx.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            throw { msg: "Product not found", status: 404 };
        }
        //check same product is already added in cart or not
        if (product.quantityInStock < 1)
            throw { msg: "Oops! product is out of stock", status: 422 };


        const isAlreadyAdded = await tx.cartItem.findFirst({
            where: { productId }
        });

        let cart;
        if (isAlreadyAdded?.productId) {//just increase the quantity

            const quantity = isAlreadyAdded.quantity + 1;
            //update
            cart = await tx.cartItem.update({
                where: {
                    userId_productId: {
                        userId: isAlreadyAdded.userId,
                        productId: isAlreadyAdded.productId
                    }
                },
                data: { quantity: quantity }
            });
        } else {
            console.log("Hello one");
            cart = await tx.cartItem.create({
                data: {
                    quantity: 1,
                    unitPrice: product.unitPrice,
                    userId: userId,
                    productId: product.id
                }
            });
        }

        return cart;
    });
}