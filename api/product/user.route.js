import productController from './product.controller.js';

const productRoutes = [
    {
      url: '/health',
      handler: productController.health,
      method: 'GET',
    },
]
export default productRoutes;