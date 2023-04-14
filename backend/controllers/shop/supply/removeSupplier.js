import prisma from "../../../init/db.js";
import { errorResponse, successResponse } from "../../../utils/helper/response.js";

export default async (req, reply) => {
    try {

        const supplierId = req.params.supplierId;

        if (!supplierId)
            throw { msg: "SupplierId required", status: 400 };

        const supplier = await prisma.supplier.findUnique({ where: { id: supplierId } });

        if (!supplier) {
            throw { msg: "Supplier not found", status: 404 };
        }

        await prisma.supplier.delete({ where: { id: supplierId } });

        reply.code(200).send(successResponse(null, "Suppliers removed from list"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}