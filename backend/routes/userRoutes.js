import user from '../controllers/user/index.js';
import verifyToken from '../middleware/verifyToken.js'
export default async (fastify, otps, done) => {
    fastify.put('/change-email', { preHandler: [verifyToken], handler: user.changeEmail });
    fastify.put('/change-password', { preHandler: [verifyToken], handler: user.changePassword });
    fastify.post('/forget-password', user.forgetPassword);
    fastify.post('/login', user.login);
    fastify.post('/register', user.register);
    fastify.get("/details", { preHandler: [verifyToken], handler: user.getUser });
    fastify.post('/verify-email', user.verifyMail);
    fastify.post('/send-new-otp', user.sendNewOtp);
    fastify.post('/address', { preHandler: [verifyToken], handler: user.addAddress });
    fastify.put('/address/:addressId', { preHandler: [verifyToken], handler: user.updateAddress });
    fastify.get('/address', { preHandler: [verifyToken], handler: user.getAddress });

    done();
}