import userController from './user.controller.js';
import userControllers from '../../controllers/user/index.js';
import wishlist from '../../controllers/wishlist/index.js';

const userRoutes = [
  {
    url: '/health',
    handler: userController.health,
    method: 'GET',
    preHandler : []
  },
  {
    url: '/change-email',
    handler: userControllers.changeEmail,
    method: 'PUT',
    preHandler : []
  },
  {
    url: '/change-password',
    handler: userControllers.changePassword,
    method: 'PUT',
    preHandler : []
  },
  {
    url: '/forget-password',
    handler: userControllers.forgetPassword,
    method: 'POST',
    preHandler : []
  },
  {
    url: '/login',
    handler: userControllers.login,
    method: 'POST',
    preHandler : []
  },
  {
    url: '/register',
    handler: userControllers.register,
    method: 'POST',
    preHandler : []
  },
  {
    url: '/details',
    handler: userControllers.getUser,
    method: 'GET',
    preHandler : []
  },
  {
    url: '/update',
    handler: userControllers.editProfile,
    method: 'PUT',
    preHandler : []
  },
  {
    url: '/verify-email',
    handler: userControllers.verifyMail,
    method: 'POST',
    preHandler : []
  },
  {
    url: '/send-new-otp',
    handler: userControllers.sendNewOtp,
    method: 'POST',
    preHandler : []
  },
  {
    url: '/address',
    handler: userControllers.addAddress,
    method: 'POST',
    preHandler : []
  },
  {
    url: '/address/:addressId',
    handler: userControllers.updateAddress,
    method: 'PUT',
    preHandler : []
  },
  {
    url: '/address',
    handler: userControllers.getAddress,
    method: 'GET',
    preHandler : []
  },
  {
    url: '/reset-password',
    handler: userControllers.resetPassword,
    method: 'PUT',
    preHandler : []
  },
  {
    url: '/wishlist/:productId',
    handler: wishlist.addProductToWishlist,
    method: 'POST',
    preHandler : []
  },
  {
    url: '/wishlist/:productId',
    handler: wishlist.removedProductFromWishlist,
    method: 'DELETE',
    preHandler : []
  },
  {
    url: '/wishlist',
    handler: wishlist.getWishlist,
    method: 'GET',
    preHandler : []
  },
]
export default userRoutes;