import cart from "../controllers/orderAndCart/cart/index.js";
import verifyToken from '../middleware/verifyToken.js';

export default async (fastify, otps, done) => {
    fastify.post('/add-item/:productId', { preHandler: verifyToken, handler: cart.addItemToCart });
    fastify.get('/items', { preHandler: verifyToken }, cart.getCartItem);
    fastify.delete('/remove-item/:productId', { preHandler: verifyToken }, cart.removeItemFromCart);
    fastify.put('/update-item/:productId', { preHandler: verifyToken }, cart.updateCartItem);
    done();
}