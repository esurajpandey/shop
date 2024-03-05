import prisma from "../../init/db.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";

export default async (req, reply) => {
    try {
        reply.code(200).send(successResponse("User health is fine", "user details"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}