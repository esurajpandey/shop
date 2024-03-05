import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'
import { DeliveryStatus, OrderStatus, PaymentMode } from '@prisma/client';
import payementLink from '../../../utils/helper/payementLink.js';

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");
        const { paymentMode } = req.body;
        const order = await orderTrasaction(userId, paymentMode);
        reply.code(200).send(successResponse(order, "Order placed successfully"))
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}


const orderTrasaction = async (userId, payementMode) => {
    return prisma.$transaction(async tx => {
        const user = await tx.user.findUnique({ where: { id: userId }, include: { address: true } });

        if (!user.isEmailVerified) {
            throw { msg: "Account is not activated", status: 400 };
        }

        const cartItems = await tx.cartItem.findMany({
            where: {
                userId
            },
            select: {
                product: {
                    select: {
                        id: true,
                        quantityInStock: true,
                        unitPrice: true,
                        name: true,
                        shopId: true
                    }
                },
                quantity: true,
            }
        });

        if (cartItems && cartItems.length === 0) {
            throw { msg: "No items in cart to order", status: 400 }
        }

        let totalAmount = 0;
        const shopId = cartItems[0].product.shopId;

        cartItems.forEach(item => {
            if (item.product.quantityInStock < item.quantity) {
                throw { msg: `${item.product.name} is out of stock`, status: 422 }
            }
            totalAmount = totalAmount + (Number(item.product.unitPrice) * Number(item.quantity));
        });

        if (totalAmount === 0)
            throw { msg: "Something went wrong", status: 422 }



        const order = await tx.order.create({
            data: {
                amount: totalAmount,
                deliveryStatus: DeliveryStatus.ORDERED,
                orderStatus: payementMode === PaymentMode.ONLINE ? OrderStatus.INITIATED : OrderStatus.CONFIRMED,
                payment_mode: payementMode === PaymentMode.ONLINE ? PaymentMode.ONLINE : PaymentMode.COD,
                address: {
                    connect: {
                        id: user.addressId
                    }
                },
                shop: {
                    connect: {
                        id: shopId,
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        if (!order) {
            throw { msg: "Unable to place order", status: 422 }
        }

        const orderItemData = cartItems.map(item => {
            return {
                quantity: item.quantity,
                unitPrice: item.product.unitPrice,
                orderId: order.id,
                productId: item.product.id
            }
        });

        await tx.orderItem.createMany({
            data: orderItemData
        });

        //remove cart items
        await tx.cartItem.deleteMany({
            where: {
                userId
            }
        })


        //update product count
        const carts = await Promise.all(
            cartItems.map(async item => {
                await tx.product.update({
                    where: {
                        id: item.product.id
                    },
                    data: {
                        quantityInStock: (item.product.quantityInStock - item.quantity)
                    }
                })
            })
        );

        if (payementMode === PaymentMode.COD) {
            return order;
        }

        const link = await payementLink(order.id, order.amount, user);
        return link;
    })
}