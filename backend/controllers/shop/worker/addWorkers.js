import prisma from '../../../init/db.js';
import { errorResponse, successResponse } from '../../../utils/helper/response.js';
import bcrypt from 'bcryptjs';

export default async (req, reply) => {
    const { name, email, password, mobile } = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, 10);
        const isWorkerExist = await prisma.user.findUnique({ where: { email } });

        const shopId = req.requestContext.get("shopId");

        if (isWorkerExist)
            throw { msg: "User is already registered", status: 409 };

        const worker = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                mobile,
                isEmailVerified: true,
                type: "WORKER",
                worker: {
                    connect: {
                        id: shopId
                    }
                }
            }
        });

        if (!worker)
            throw { msg: "Unable to add worker", status: 422 };

        reply
            .code(201)
            .send(successResponse(worker, "New worker added"));

    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}