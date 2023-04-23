import prisma from "../../init/db.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                mobile: true,
                email: true,
                isEmailVerified: true,
                type: true,
                profile: true,
                createdAt: true
            }
        })

        if (!user)
            throw { msg: "User not found", status: 404 }

        reply.code(200).send(successResponse(user, "user details"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}