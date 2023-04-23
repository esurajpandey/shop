import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const {
            city,
            address_line1,
            country,
            state,
            zip,
        } = req.body;

        const userId = req.requestContext.get("userId");

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                address: {
                    create: {
                        address_line1,
                        city,
                        state,
                        zip,
                        country,
                    }
                }
            },
            select: {
                address: true
            }
        });
        console.log(user);

        if (!address) {
            throw { msg: "Unable to create address", status: 422 }
        }

        reply.code(201).send(successResponse(address, "Address added"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}