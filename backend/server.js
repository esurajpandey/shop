import Fastify from 'fastify';
import dotenv from 'dotenv';
dotenv.config();
import cors from '@fastify/cors'
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'
import adminRoutes from './routes/adminRoutes.js';

const fastify = Fastify();//{ logger: true }
await fastify.register(cors);

fastify.get('/api', async (req, resp) => {
    resp.send("Hello Welcome")
})

fastify.register(userRoutes, { prefix: '/api/user' });
fastify.register(productRoutes, { prefix: "/api/product" });
fastify.register(adminRoutes, { prefix: "/api/admin" });

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