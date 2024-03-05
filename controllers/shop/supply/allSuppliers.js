import prisma from "../../../init/db.js";
import { errorResponse, successResponse } from "../../../utils/helper/response.js";

export default async (req, reply) => {
    try {
        const suppliers = await prisma.supplier.findMany({ where: { isDeleted: false } });

        if (suppliers.length === 0)
            throw { msg: "No supplier found", status: 404 };
        reply.code(200).send(successResponse(suppliers, "Suppliers details"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}