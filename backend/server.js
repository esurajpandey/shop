import Fastify from 'fastify';

import dotenv from 'dotenv';
dotenv.config();
import cors from '@fastify/cors'

const fastify = Fastify({ logger: true });


await fastify.register(cors);
fastify.get('/api', async (req, resp) => {
    resp.send("Hello Welcome")
})


const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await fastify.listen({ port: PORT }, () => {
            console.log("Server running at", PORT);
        });
    } catch (err) {
        console.log(err.message);
    } finally {
        //closing connection
    }
}

start();