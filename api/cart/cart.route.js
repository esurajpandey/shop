import cart from '../../controllers/orderAndCart/cart/index.js';

const cartRoutes = [
    {
      url: '/add-item/:productId',
      handler: cart.addItemToCart,
      method: 'POST',
      preHandler: []
    },
    {
      url: '/items',
      handler: cart.getCartItem,
      method: 'GET',
      preHandler: []
    },
    {
      url: '/remove-item/:productId',
      handler: cart.removeItemFromCart,
      method: 'DELETE',
      preHandler: []
    },
    {
      url: '/update-item/:productId',
      handler: cart.updateCartItem,
      method: 'PUT',
      preHandler: []
    }
  ];
  
  export default cartRoutes;