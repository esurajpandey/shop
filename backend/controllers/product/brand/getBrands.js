import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const page = +(req.query?.page ?? "0");

        const brands = await prisma.brand.findMany({
            select: {
                id: true,
                name: true,
            }
        });

        if (brands.length === 0)
            throw { msg: "No brand found", status: 404 };

        reply.code(200).send(successResponse(brands, "Brand list"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}