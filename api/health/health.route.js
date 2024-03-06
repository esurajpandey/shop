import healthController from './health.controller.js';

const productRoutes = [
    {
      url: '/',
      handler: healthController.health,
      method: 'GET',
    },
]
export default productRoutes;