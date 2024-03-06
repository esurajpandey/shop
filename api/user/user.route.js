// import userController from './user.controller.js';
import userControllers from '../../controllers/user/index.js';
import wishlist from '../../controllers/wishlist/index.js';

const userRoutes = [
  {
    url: '/change-email',
    handler: userControllers.changeEmail,
    method: 'PUT'
  },
  {
    url: '/change-password',
    handler: userControllers.changePassword,
    method: 'PUT'
  },
  {
    url: '/forget-password',
    handler: userControllers.forgetPassword,
    method: 'POST'
  },
  {
    url: '/login',
    handler: userControllers.login,
    method: 'POST'
  },
  {
    url: '/register',
    handler: userControllers.register,
    method: 'POST'
  },
  {
    url: '/details',
    handler: userControllers.getUser,
    method: 'GET'
  },
  {
    url: '/update',
    handler: userControllers.editProfile,
    method: 'PUT'
  },
  {
    url: '/verify-email',
    handler: userControllers.verifyMail,
    method: 'POST'
  },
  {
    url: '/send-new-otp',
    handler: userControllers.sendNewOtp,
    method: 'POST'
  },
  {
    url: '/address',
    handler: userControllers.addAddress,
    method: 'POST'
  },
  {
    url: '/address/:addressId',
    handler: userControllers.updateAddress,
    method: 'PUT'
  },
  {
    url: '/address',
    handler: userControllers.getAddress,
    method: 'GET'
  },
  {
    url: '/reset-password',
    handler: userControllers.resetPassword,
    method: 'PUT'
  },
  {
    url: '/wishlist/:productId',
    handler: wishlist.addProductToWishlist,
    method: 'POST',
  },
  {
    url: '/wishlist/:productId',
    handler: wishlist.removedProductFromWishlist,
    method: 'DELETE'
  },
  {
    url: '/wishlist',
    handler: wishlist.getWishlist,
    method: 'GET'
  },
]
export default userRoutes;