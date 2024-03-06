import userController from './user.controller.js';
import userControllers from '../../controllers/user/index.js';
import wishlist from '../../controllers/wishlist/index.js';

const userRoutes = [
  {
    url: '/health',
    handler: userController.health,
    method: 'GET',
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
  },
  {
    url: '/login',
    handler: userControllers.login,
    method: 'POST',
  },
  {
    url: '/register',
    handler: userControllers.register,
    method: 'POST',
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
  },
  {
    url: '/send-new-otp',
    handler: userControllers.sendNewOtp,
    method: 'POST',
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