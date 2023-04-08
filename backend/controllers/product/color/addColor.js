import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const { colorName } = req.body;

        const color = await prisma.brand.create({
            data: {
                name: colorName,
            }
        });

        if (!color)
            throw { msg: "Unable to create color", status: 422 };

        reply.code(201).send(successResponse(color, "Color added in your store"));

    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}