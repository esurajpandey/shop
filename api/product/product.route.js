import productController from '../../controllers/product/index.js';
import adminVerifier from '../../middleware/adminVerifier.js';

const productRoutes = [
  {
    url: '/brands',
    handler: productController.getBrands,
    method: 'GET',
  },
  {
    url: '/brand',
    handler: productController.addBrand,
    method: 'POST',
  },
  {
    url: '/categories',
    handler: productController.getCateory,
    method: 'GET',
  },
  {
    url: '/category',
    handler: productController.addCategory,
    method: 'POST',
  },
  {
    url: '/colors',
    handler: productController.getColors,
    method: 'GET',

  },
  {
    url: '/color',
    handler: productController.addColor,
    method: 'POST',
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
  },
  {
    url: '/:productId',
    handler: productController.getProduct,
    method: 'GET',
  },
  {
    url: '/',
    handler: productController.addProduct,
    method: 'POST',
    preHandler: [adminVerifier]
  }
];

export default productRoutes;