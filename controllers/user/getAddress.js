import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const userId = req.requestContext.get("userId");

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                address: {
                    select: {
                        id: true,
                        city: true,
                        address_line1: true,
                        country: true,
                        state: true,
                        zip: true,
                        country: true,
                    }
                }
            }
        })

        if (!user.address) {
            throw { msg: "No address found", status: 404 };
        }

        reply.code(201).send(successResponse(user.address, "Address details"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}