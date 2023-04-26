import prisma from '../init/db.js';
import { errorResponse } from '../utils/helper/response.js';
import { UserType } from '@prisma/client';

export default async (req, reply, next) => {
    try {
        const userId = req.requestContext.get('userId');

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (user.type !== UserType.WORKER) {
            throw { msg: "Only worker have access", status: 401 }
        }

    } catch (err) {
        console.log(err);
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}