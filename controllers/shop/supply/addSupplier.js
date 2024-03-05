import prisma from "../../../init/db.js";
import { errorResponse, successResponse } from "../../../utils/helper/response.js";

export default async (req, reply) => {
    try {
        const { name, email, mobile } = req.body;

        const supplier = await prisma.supplier.create({
            data: {
                name, email, mobile
            }
        });
        reply.code(201).send(successResponse(supplier, "Supplier added"));
    } catch (err) {
        console.log(err.message);
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}
