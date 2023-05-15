import shop from "../controllers/shop/index.js"
import adminVerifier from "../middleware/adminVerifier.js";
import verifyToken from "../middleware/verifyToken.js";

export default async (fastify, otps, done) => {
    fastify.post("/worker", { preHandler: [verifyToken, adminVerifier], handler: shop.addWorkers });
    fastify.get("/workers", { preHandler: [verifyToken, adminVerifier], handler: shop.allWorkers });

    fastify.get("/order/orderId", { preHandler: [verifyToken, adminVerifier], handler: shop.getOrderDetails });
    fastify.get("/orders", { preHandler: [verifyToken, adminVerifier], handler: shop.allOrders });
    fastify.post("/customer-to-worker", { preHandler: [verifyToken, adminVerifier], handler: shop.convertToWorker });
    
    fastify.put('/update-order/:orderId',{ preHandler: [verifyToken, adminVerifier], handler: shop.manageOrder } );
    fastify.put('/remove-worker/:workerId',{ preHandler: [verifyToken, adminVerifier], handler: shop.removeWorker } );
    fastify.put('/update-worker/:workerId',{ preHandler: [verifyToken, adminVerifier], handler: shop.updateWorker } );

    fastify.post("/supplier", { preHandler: [verifyToken, adminVerifier], handler: shop.addSupplier });
    fastify.get("/suppliers", { preHandler: [verifyToken, adminVerifier], handler: shop.allSupplier });
    fastify.get("/analytics", { preHandler: [verifyToken, adminVerifier], handler: shop.analystic });
    fastify.delete('/remove-supplier/:supplierId', { preHandler: [verifyToken, adminVerifier], handler: shop.removeSupplier });
    fastify.put('/update-supplier/:supplierId', { preHandler: [verifyToken, adminVerifier], handler: shop.updateSupplier });
    fastify.put('/assign-order-worker/:orderId', { preHandler: [verifyToken, adminVerifier], handler: shop.assignOrderToWorker });
    done();
}