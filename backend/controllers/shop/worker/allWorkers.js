import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const page = (+(req.query?.page ?? "1") - 1);

        const shopId = req.requestContext.get('shopId');
        const shopWorkers = await prisma.shop.findUnique({
            where: { id: shopId },
            select: {
                workers: {
                    take: 10,
                    skip: 10 * page,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        mobile: true,
                        createdAt: true,
                    }
                },
            }
        });

        reply
            .code(200)
            .send(successResponse(shopWorkers.workers, "Workers details"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}