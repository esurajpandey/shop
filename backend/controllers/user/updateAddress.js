import prisma from '../../init/db.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';

export default async (req, reply) => {
    try {
        const {
            city,
            address_line1,
            country,
            state,
            zip
        } = req.body;
        const addressId = req.params.addresId;

        const address = await prisma.address.update({
            where: {
                id: addressId
            },
            data: {
                city,
                address_line1,
                country,
                state,
                zip,
            }
        });

        if (!address) {
            throw { msg: "Unable to update address", status: 422 }
        }

        reply.code(201).send(successResponse(address, "Updated address"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}