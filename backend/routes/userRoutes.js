import user from '../controllers/user/index.js';
import verifyToken from '../middleware/verifyToken.js'
import wishlist from '../controllers/wishlist/index.js';

export default async (fastify, otps, done) => {
    fastify.put('/change-email', { preHandler: verifyToken, handler: user.changeEmail });
    fastify.put('/change-password', { preHandler: verifyToken, handler: user.changePassword });
    fastify.post('/forget-password', user.forgetPassword);
    fastify.post('/login', user.login);
    fastify.post('/register', user.register);
    fastify.get("/details", { preHandler: verifyToken, handler: user.getUser });

    fastify.put("/update", { preHandler: verifyToken, handler: user.editProfile });

    fastify.post('/verify-email', user.verifyMail);
    fastify.post('/send-new-otp', user.sendNewOtp);
    fastify.post('/address', { preHandler: verifyToken, handler: user.addAddress });
    fastify.put('/address/:addressId', { preHandler: verifyToken, handler: user.updateAddress });
    fastify.get('/address', { preHandler: verifyToken, handler: user.getAddress });
    fastify.put('/reset-password', { handler: user.resetPassword });
    fastify.post('/wishlist/:productId', { preHandler: verifyToken, handler: wishlist.addProductToWishlist });
    fastify.delete('/wishlist/:productId', { preHandler: verifyToken, handler: wishlist.removedProductFromWishlist });
    fastify.get('/wishlist', { preHandler: verifyToken, handler: wishlist.getWishlist });
    done();
}