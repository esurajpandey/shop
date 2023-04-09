import shop from "../controllers/shop/index.js"

export default async (fastify, otps, done) => {
    fastify.post("/worker", shop.addWorkers);
    fastify.get("/workers", shop.allWorkers);

    fastify.get("/order/orderId", shop.getOrderDetails);
    fastify.get("/orders", shop.allOrders);
    fastify.post("/customer-to-worker", shop.convertToWorker);
    fastify.put('/update-order/:orderId', shop.manageOrder);
    fastify.put('/remove-worker/:workerId', shop.removeWorker);
}