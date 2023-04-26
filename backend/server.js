
import Fastify from 'fastify';
import dotenv from 'dotenv';
dotenv.config();
import cors from '@fastify/cors';
import fastifyRequestContext from '@fastify/request-context';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import formBody from '@fastify/formbody';

import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
import cartRoutes from './routes/cartRouter.js';
import verifyToken from './middleware/verifyToken.js';


const fastify = Fastify();//{ logger: true }
await fastify.register(cors);

const context = {
    userId: null,
    name: null,
    email: null,
    shopId: null
}


fastify.register(formBody);
fastify.register(userRoutes, { prefix: '/api/user' });
fastify.register(productRoutes, { prefix: "/api/product" });
fastify.register(adminRoutes, { prefix: "/api/admin" });
fastify.register(cartRoutes, { prefix: "/api/cart" });
fastify.register(orderRoutes, { prefix: "/api/order" });

fastify.register(fastifyRequestContext, { hook: 'onRequest', defaultStoreValues: context });

fastify.get('/api', async (req, resp) => {
    resp.send("Hello Welcome")
})

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        fastify.listen({ port: PORT }, () => {
            console.log("Server running at", PORT);
        });
    } catch (err) {
        console.log(err.message);
    } finally {
        //closing connection
    }
}

start();