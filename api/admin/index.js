import adminRoutes from "./admin.route.js";
import verifyToken from "../../middleware/verifyToken.js";

export default async function (router) {
  for (const adminRoute of adminRoutes) {
		if (Array.isArray(adminRoute.preHandler)) {
			adminRoute.preHandler = [verifyToken,...adminRoute.preHandler];
		}
		router.route(adminRoute);
	}
}