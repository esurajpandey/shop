import prisma from "../../init/db.js";
import { errorResponse } from "../../utils/helper/response.js";

export default async (req, reply) => {
    try {

    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}