
import orderControllers from '../../controllers/orderAndCart/order/index.js';
import workerVerifier from '../../middleware/workerVerifier.js';

const orderRoutes = [
    {
      url: '/order-now',
      handler: orderControllers.orderNow,
      method: 'POST',
      preHandler: []
    },
    {
      url: '/verify-payment',
      handler: orderControllers.verifyPayment,
      method: 'POST'
    },
    {
      url: '/all',
      handler: orderControllers.allOrder,
      method: 'GET',
      preHandler: []
    },
    {
      url: '/add-review',
      handler: orderControllers.addReview,
      method: 'POST',
      preHandler: []
    },
    {
      url: '/cancel/:orderId',
      handler: orderControllers.cancelOrder,
      method: 'PUT',
      preHandler: []
    },
    {
      url: '/items/:orderId',
      handler: orderControllers.getOrderItems,
      method: 'GET',
      preHandler: []
    },
    {
      url: '/place-order',
      handler: orderControllers.placeOrder,
      method: 'POST',
      preHandler: [] // Assuming this is pending and still requires token verification
    },
    {
      url: '/remove-review',
      handler: orderControllers.removeReview,
      method: 'DELETE',
      preHandler: []
    },
    {
      url: '/update-review',
      handler: orderControllers.updateReview,
      method: 'PUT',
      preHandler: []
    },
    {
      url: '/update-delivery-status/:orderId',
      handler: orderControllers.updateDeliveryStatus,
      method: 'PUT',
      preHandler: [workerVerifier]
    },
    {
      url: '/delivery',
      handler: orderControllers.orderOnMyName,
      method: 'GET',
      preHandler: [workerVerifier] // Assuming both token verification and worker verification are required
    }
  ];
  
  export default orderRoutes;