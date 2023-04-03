import user from '../controllers/user/index.js';

export default async (fastify, otps, done) => {
    fastify.put('/change-email', user.changeEmail);
    fastify.put('/change-password', user.changePassword);
    fastify.post('/forget-password', user.forgetPassword);
    fastify.post('/login', user.login);
    fastify.post('/register', user.register);
    fastify.get("/details", user.getUser);
    fastify.post('/verify-email', user.verifyMail);
    fastify.post('/send-new-otp', user.sendNewOtp);
}