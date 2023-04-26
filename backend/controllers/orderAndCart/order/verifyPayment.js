import dotenv from 'dotenv';
dotenv.config();

import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'
import crypto from 'crypto';
import { OrderStatus, DeliveryStatus } from '@prisma/client';

const redirectUrl = process.env.REDIRECT_URL;
export default async (req, reply) => {
    try {
        console.log("Hello in verify payment");
        const orderId = req.query.orderId;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_KEY_SECRET).update(body.toString()).digest('hex');


        if (expectedSignature !== razorpay_signature) {
            throw { msg: "Payment is not successfull", status: 403 }
        }

        console.log(orderId, "OrderId");
        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                deliveryStatus: DeliveryStatus.ORDERED,
                orderStatus: OrderStatus.CONFIRMED
            }
        });

        reply.redirect(`${redirectUrl}?reference=${razorpay_payment_id}`);
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}