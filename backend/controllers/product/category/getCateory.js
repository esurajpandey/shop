import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const category = await prisma.category.findMany();
        if (category.length === 0) {
            throw { msg: "No category found", status: 404 };
        }
        reply.code(200).send(successResponse(category, "All categories"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}