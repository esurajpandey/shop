import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const { brandName } = req.body;

        const brand = await prisma.brand.create({
            data: {
                name: brandName,
            }
        });

        if (!brand)
            throw { msg: "Unable to create brand", status: 422 };

        reply.code(201).send(successResponse(brand, "Brand added in your store"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}