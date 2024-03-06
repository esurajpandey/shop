
// import Fastify from 'fastify';
// import dotenv from 'dotenv';
// dotenv.config();
// import cors from '@fastify/cors';
// import fastifyRequestContext from '@fastify/request-context';
// import userRoutes from './routes/userRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import formBody from '@fastify/formbody';

// import productRoutes from './routes/productRoutes.js'
// import adminRoutes from './routes/adminRoutes.js';
// import cartRoutes from './routes/cartRouter.js';
// import verifyToken from './middleware/verifyToken.js';
// import { errorResponse } from './utils/helper/response.js';

// (async () => {
//     const fastify = Fastify();//{ logger: true }
//     await fastify.register(cors);

//     const context = {
//         userId: null,
//         name: null,
//         email: null,
//         shopId: null
//     }


//     await fastify.register(formBody);

//     await fastify.register(userRoutes, { prefix: '/api/user' });
// //     await fastify.register(productRoutes, { prefix: "/api/product" });
// //     await fastify.register(adminRoutes, { prefix: "/api/admin" });
// //    await fastify.register(cartRoutes, { prefix: "/api/cart" });
// //     await fastify.register(orderRoutes, { prefix: "/api/order" });

//     await fastify.register(fastifyRequestContext, { hook: 'onRequest', defaultStoreValues: context });

//     fastify.get('/api', async (req, reply) => {
//         reply.send("Hello Welcome")
//     });

//     fastify.setErrorHandler(async(error, request, reply) => {
//         console.log("Indide error handler")
//         reply.status(error?.code).send(errorResponse(error));
//     });


//     const PORT = process.env.PORT || 5000;
//     fastify.listen({ port: PORT, host: '0.0.0.0' })
//     .then(() => {
//         console.log("Server started at 0.0.0.0:",PORT);
//     })
// })();


