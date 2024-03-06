import orderRoutes from "./order.route.js";
import verifyToken from "../../middleware/verifyToken.js";

export default async function (router) {
    for (const route of orderRoutes) {
      switch (route.method) {
        case 'GET':
          router.get(route.url, route.handler)
          break
        case 'POST':
          router.post(route.url, route.handler)
          break
        case 'PUT':
          router.put(route.url, route.handler)
          break
        case 'DELETE':
          router.delete(route.url, route.handler)
          break
      }

      if (Array.isArray(route.preHandler)) {
        route.preHandler = [verifyToken, ...route.preHandler];
      }
    }
    
    return router;
}