import adminController from '../../controllers/shop/index.js';
import productController from '../../controllers/product/index.js';
import adminVerifier from '../../middleware/adminVerifier.js';


const userRoutes = [
    {
        url: '/worker',
        handler: adminController.addWorkers,
        method: 'POST',
        preHandler : [adminVerifier]
      },
      {
        url: '/workers',
        handler: adminController.allWorkers,
        method: 'GET',
        preHandler : [adminVerifier]
      },
      {
        url: '/order/:orderId',
        handler: adminController.getOrderDetails,
        method: 'GET',
        preHandler : [adminVerifier]
      },
      {
        url: '/orders',
        handler: adminController.allOrders,
        method: 'GET',
        preHandler : [adminVerifier]
      },
      {
        url: '/customer-to-worker',
        handler: adminController.convertToWorker,
        method: 'POST',
        preHandler : [adminVerifier]
      },
      {
        url: '/update-order/:orderId',
        handler: adminController.manageOrder,
        method: 'PUT',
        preHandler : [adminVerifier]
      },
      {
        url: '/remove-worker/:workerId',
        handler: adminController.removeWorker,
        method: 'DELETE',
        preHandler : [adminVerifier]
      },
      {
        url: '/update-worker/:workerId',
        handler: adminController.updateWorker,
        method: 'PUT',
        preHandler : [adminVerifier]
      },
      {
        url: '/supplier',
        handler: adminController.addSupplier,
        method: 'POST',
        preHandler : [adminVerifier]
      },
      {
        url: '/suppliers',
        handler: adminController.allSupplier,
        method: 'GET',
        preHandler : [adminVerifier]
      },
      {
        url: '/analytics',
        handler: adminController.analystic,
        method: 'GET',
        preHandler : [adminVerifier]
      },
      {
        url: '/remove-supplier/:supplierId',
        handler: adminController.removeSupplier,
        method: 'DELETE',
        preHandler : [adminVerifier]
      },
      {
        url: '/update-supplier/:supplierId',
        handler: adminController.updateSupplier,
        method: 'PUT',
        preHandler : [adminVerifier]
      },
      {
        url: '/assign-order-worker/:orderId',
        handler: adminController.assignOrderToWorker,
        method: 'PUT',
        preHandler : [adminVerifier]
      },
      {
        url: '/product/:productId',
        handler: productController.deleteProduct,
        method: 'DELETE',
        preHandler : [adminVerifier]
      }
];

export default userRoutes;