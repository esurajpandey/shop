import prisma from '../../init/db.js'
import { successResponse, errorResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const { name, mobile } = req.body;
        const userId = req.requestContext.get("userId");

        if (!name || !mobile) {
            throw { msg: "Required field missing", status: 400 }
        }


        if (mobile.length !== 10) {
            throw { msg: "Invalid number", status: 400 }
        }

        const update = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                mobile,
                name
            },
            select: {
                id: true,
                name: true,
                email: true,
                isEmailVerified: true,
            }
        })

        if (!update) {
            throw { msg: "Unable to update data", status: 422 }
        }

        reply.code(200).send(successResponse(update, "Details updated"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}