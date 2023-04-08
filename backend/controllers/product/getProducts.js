import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const page = +(req.query?.page ?? "0");

        const products = await prisma.product.findMany({
            take: 10,
            skip: 10 * page,
            include: {
                color: true,
                brand: true,
                attributes: true,
            }
        });

        if (products.length === 0)
            throw { msg: "No product found", status: 404 };

        reply.code(200).send(successResponse(products, "Product lists"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}