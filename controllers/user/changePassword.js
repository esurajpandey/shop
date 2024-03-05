import prisma from "../../init/db.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";
import bcrypt from 'bcryptjs';

export default async (req, reply) => {
    try {
        const { newPassword, oldPassword } = req.body;
        const userId = req.requestContext.get("userId");
        const user = await prisma.user.findUnique({ where: { id: userId } });

        const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);

        if (!isPasswordCorrect) {
            throw { msg: "Incorrect password", status: 401 }
        }
        console.log(newPassword);
        const hashPassword = bcrypt.hashSync(newPassword, 10);

        const updateData = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashPassword
            }
        });

        reply.code(200).send(successResponse(null, "Password changed successfully"))
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}