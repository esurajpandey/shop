import product from "../controllers/product/index.js"
import adminVerifier from "../middleware/adminVerifier.js";
import verifyToken from '../middleware/verifyToken.js';
export default async (fastify, otps, done) => {
    fastify.get('/brands', product.getBrands);
    fastify.post('/brand', product.addBrand);
    fastify.get('/categories', product.getCateory);
    fastify.post('/category', product.addCategory);
    fastify.get('/colors', product.getColors);
    fastify.post('/color', product.addColor);
    fastify.put('/update/:productId', product.editProduct);
    fastify.get('/all', product.getProducts);
    fastify.get('/:productId', product.getProduct);
    fastify.post('/', { preHandler: [verifyToken, adminVerifier] }, product.addProduct);
    done();
}