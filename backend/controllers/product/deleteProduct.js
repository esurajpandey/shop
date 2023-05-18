import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const { productId } = req.params;

        const updated = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                isDeleted: true
            }
        });

        if (!updated) {
            throw { msg: "Product not found", status: 400 };
        }

        reply.code(200).send(successResponse({}, "Product is moved to archived"));

    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}