import userController from './user.controller.js';

const userRoutes = [
    {
      url: '/health',
      handler: userController.health,
      method: 'GET',
    },
]
export default userRoutes;