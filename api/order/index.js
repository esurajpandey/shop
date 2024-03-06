import orderRoutes from "./order.route.js";
import verifyToken from "../../middleware/verifyToken.js";
export default async function (router) {
  for (const orderRoute of orderRoutes) {
		if (Array.isArray(orderRoute.preHandler)) {
			orderRoute.preHandler = [verifyToken,...orderRoute.preHandler];
		}
		router.route(orderRoute);
	}
}