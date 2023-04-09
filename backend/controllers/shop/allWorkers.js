import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const page = +(req.query?.page ?? "0");

        const shopId = req.shop.id;
        const workers = await prisma.shop.findUnique({
            where: { id: shopId },
            select: {
                workers: true,
            }
        });

        if (workers.workers.length === 0) {
            throw { msg: "No workers found", status: 404 };
        }
        reply
            .code(200)
            .send(successResponse(workers.workers, "Workers details"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}