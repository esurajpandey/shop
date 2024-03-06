import cartRoutes from "./cart.route.js";
import verifyToken from "../../middleware/verifyToken.js";

export default async function (router) {
    for (const cartRoute of cartRoutes) {
		if (Array.isArray(cartRoute.preHandler)) {
			cartRoute.preHandler = [verifyToken,...cartRoute.preHandler];
		}
		router.route(cartRoute);
	}
}