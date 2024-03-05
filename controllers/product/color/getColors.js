import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';


export default async (req, reply) => {
    console.log("hellpo");
    try {
        const colors = await prisma.color.findMany();
        if (colors.length === 0) {
            throw { msg: "No color found", status: 404 };
        }
        reply.code(200).send(successResponse(colors, "All colors"));
    } catch (err) {
        // console.log(err);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}