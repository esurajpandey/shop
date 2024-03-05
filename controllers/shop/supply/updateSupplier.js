import prisma from '../../../init/db.js';
import { successResponse, errorResponse } from '../../../utils/helper/response.js'
export default async (req, reply) => {
    try {
        const supplierId = req.params.supplierId;

        const supplier = await prisma.supplier.findUnique({
            where: {
                id: supplierId
            },
            select: {
                id: true,
                name: true,
            }
        });

        if (!supplier) {
            throw { msg: "Supplier not found", status: 404 };
        }


        const updatedSupplier = await prisma.supplier.update({
            where: { id: supplierId },
            data: {
                ...req.body
            },
            select: {
                id: true,
                email: true,
                name: true,
                mobile: true
            }
        });

        reply.code(200).send(successResponse(updatedSupplier, "Supplier is updated"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}