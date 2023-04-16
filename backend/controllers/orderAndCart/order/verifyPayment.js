import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js'
import crypto from 'crypto';
export default async (req, reply) => {
    try {
        // const { orderId, paymentId } = req.body;
        // const payment = await razorpay.payments.fetch(paymentId);
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log("RazorOrderId : ", razorpay_order_id, "Payment iD", razorpay_payment_id, "signature", razorpay_signature);

        reply.code(200).send({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}