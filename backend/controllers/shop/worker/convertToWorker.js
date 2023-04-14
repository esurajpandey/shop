import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';


export default async (req, reply) => {
    try {
        const { email } = req.body;

        const isUserExists = await prisma.user.findUnique({ where: { email } });

        if (!isUserExists)
            throw { msg: "User does not exist", status: 404 };

        //doubt for checking user password 

        //edit the type of workers
        const worker = await prisma.user.update({
            where: {
                id: isUserExists.id
            },
            data: {
                type: "WORKER"
            },
            select: {
                id: true,
                name: true,
                email: true,
                type: true,
            }
        });

        if (!worker)
            throw { msg: "Unable to make worker", status: 422 };

        reply
            .code(200)
            .send(successResponse(worker, "User is now added to worker lists"));
    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}