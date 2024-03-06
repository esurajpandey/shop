import shop from "../controllers/shop/index.js"
import adminVerifier from "../middleware/adminVerifier.js";
import verifyToken from "../middleware/verifyToken.js";
import product from '../controllers/product/index.js';

export default async (fastify, otps, done) => {
    fastify.post("/worker", { preHandler: adminVerifier, handler: shop.addWorkers });
    fastify.get("/workers", { preHandler: adminVerifier, handler: shop.allWorkers });

    fastify.get("/order/orderId", { preHandler: adminVerifier, handler: shop.getOrderDetails });
    fastify.get("/orders", { preHandler: adminVerifier, handler: shop.allOrders });
    fastify.post("/customer-to-worker", { preHandler: adminVerifier, handler: shop.convertToWorker });

    fastify.put('/update-order/:orderId', { preHandler: adminVerifier, handler: shop.manageOrder });
    fastify.delete('/remove-worker/:workerId', { preHandler: adminVerifier, handler: shop.removeWorker });
    fastify.put('/update-worker/:workerId', { preHandler: adminVerifier, handler: shop.updateWorker });

    fastify.post("/supplier", { preHandler: adminVerifier, handler: shop.addSupplier });

    fastify.get("/suppliers", { preHandler: adminVerifier, handler: shop.allSupplier });
    fastify.get("/analytics", { preHandler: adminVerifier, handler: shop.analystic });
    fastify.delete('/remove-supplier/:supplierId', { preHandler: adminVerifier, handler: shop.removeSupplier });
    fastify.put('/update-supplier/:supplierId', { preHandler: adminVerifier, handler: shop.updateSupplier });
    fastify.put('/assign-order-worker/:orderId', { preHandler: adminVerifier, handler: shop.assignOrderToWorker });

    fastify.delete("/product/:productId", { preHandler: adminVerifier, handler: product.deleteProduct });
}