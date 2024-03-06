import productController from '../../controllers/product/index.js';
import adminVerifier from '../../middleware/adminVerifier.js';

const productRoutes = [
  {
    url: '/brands',
    handler: productController.getBrands,
    method: 'GET',
    preHandler: []
  },
  {
    url: '/brand',
    handler: productController.addBrand,
    method: 'POST',
    preHandler: []
  },
  {
    url: '/categories',
    handler: productController.getCateory,
    method: 'GET',
    preHandler: []
  },
  {
    url: '/category',
    handler: productController.addCategory,
    method: 'POST',
    preHandler: []
  },
  {
    url: '/colors',
    handler: productController.getColors,
    method: 'GET',
    preHandler: []
  },
  {
    url: '/color',
    handler: productController.addColor,
    method: 'POST',
    preHandler: []
  },
  {
    url: '/update/:productId',
    handler: productController.editProduct,
    method: 'PUT',
    preHandler: []
  },
  {
    url: '/all',
    handler: productController.getProducts,
    method: 'GET',
    preHandler: []
  },
  {
    url: '/:productId',
    handler: productController.getProduct,
    method: 'GET',
    preHandler: []
  },
  {
    url: '/',
    handler: productController.addProduct,
    method: 'POST',
    preHandler: [adminVerifier]
  }
];

export default productRoutes;