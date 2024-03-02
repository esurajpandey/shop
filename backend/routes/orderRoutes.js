import order from "../controllers/orderAndCart/order/index.js";
import verifyToken from '../middleware/verifyToken.js';
import workerVerifier from "../middleware/workerVerifier.js";

export default async (fastify, otps, done) => {
    fastify.post('/order-now', { preHandler: verifyToken, handler: order.orderNow });
    fastify.post('/verify-payment', { handler: order.verifyPayment });
    fastify.get('/all', { preHandler: verifyToken, handler: order.allOrder });

    fastify.post('/add-review', { preHandler: verifyToken, handler: order.addReview });
    fastify.put('/cancel/:orderId', { preHandler: verifyToken, handler: order.cancelOrder });
    fastify.get('/items/:orderId', { preHandler: verifyToken, handler: order.getOrderItems });
    fastify.post('/place-order', { preHandler: verifyToken, handler: order.placeOrder });//pending
    fastify.delete('/remove-review', { preHandler: verifyToken, handler: order.removeReview });
    fastify.put('/update-review', { preHandler: verifyToken, handler: order.updateReview });

    fastify.put('/update-delivery-status/:orderId', { preHandler: workerVerifier, handler: order.updateDeliveryStatus });
    fastify.get('/delivery', { preHandler: verifyToken, workerVerifier, handler: order.orderOnMyName });
    done();
}