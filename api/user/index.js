import userRoutes from "./user.route.js";
import verifyToken from '../../middleware/verifyToken.js';

export default async function (router) {
  for (const userRoute of userRoutes) {
		if (Array.isArray(userRoute.preHandler)) {
			userRoute.preHandler = [];
		}
		router.route(userRoute);
	}
}