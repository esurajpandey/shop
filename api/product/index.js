import verifyToken from "../../middleware/verifyToken.js";
import productRoutes from "./product.route.js";

export default async function (router) {
  for (const productRoute of productRoutes) {
		if (Array.isArray(productRoute.preHandler)) {
			productRoute.preHandler = [verifyToken,...productRoute.preHandler];
		}
		router.route(productRoute);
	}
}