import prisma from '../../../init/db.js';
import { successResponse, errorResponse } from '../../../utils/helper/response.js'
export default async (req, reply) => {
    try {
        const workerId = req.params.workerId;

        const worker = await prisma.user.findUnique({
            where: {
                id: workerId
            },
            select: {
                id: true,
                type: true,
                name: true,
            }
        });

        if (!worker) {
            throw { msg: "Worker not found", status: 404 };
        }

        if (!(worker.type === "WORKER"))
            throw { msg: `${worker.name} is not working in your shop`, status: 400 };

        const updatedUser = await prisma.user.update({
            where: { id: worker.id },
            data: {
                type: "CUSTOMER"
            }
        });

        reply.code(200).send(successResponse(null, "User is removed from worker list"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}