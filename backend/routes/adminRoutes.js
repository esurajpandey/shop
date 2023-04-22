import shop from "../controllers/shop/index.js"
import adminVerifier from "../middleware/adminVerifier.js";
import verifyToken from "../middleware/verifyToken.js";

export default async (fastify, otps, done) => {
    fastify.post("/worker", { preHandler: [verifyToken, adminVerifier], handler: shop.addWorkers });
    fastify.get("/workers", { preHandler: [verifyToken, adminVerifier], handler: shop.allWorkers });

    fastify.get("/order/orderId", shop.getOrderDetails);
    fastify.get("/orders", shop.allOrders);
    fastify.post("/customer-to-worker", { preHandler: [verifyToken, adminVerifier], handler: shop.convertToWorker });
    fastify.put('/update-order/:orderId', shop.manageOrder);
    fastify.put('/remove-worker/:workerId', shop.removeWorker);
    fastify.put('/update-worker/:workerId', shop.updateWorker);

    fastify.post("/supplier", { preHandler: [verifyToken, adminVerifier], handler: shop.addSupplier });
    fastify.get("/suppliers", { preHandler: [verifyToken, adminVerifier], handler: shop.allSupplier });
    fastify.delete('/remove-supplier/:supplierId', { preHandler: [verifyToken, adminVerifier], handler: shop.removeSupplier });
    fastify.put('/update-supplier/:supplierId', { preHandler: [verifyToken, adminVerifier], handler: shop.updateSupplier });
    done();
}