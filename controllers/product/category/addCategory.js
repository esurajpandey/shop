import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const { category } = req.body;

        const data = await prisma.category.create({
            data: {
                name: category
            }
        });
        reply.code(200).send(successResponse(data, "Category added"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}