import prisma from "../../init/db.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";
import bcrypt from 'bcryptjs';
export default async (req, reply) => {
    try {
        const { newEmail, password } = req.body;
        const userId = req.requestContext.get("userId");
        const user = await prisma.user.findUnique({ where: { id: userId } });

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            throw { msg: "Incorrect password", status: 401 }
        }

        const isUserWithEmailExist = await prisma.user.findUnique({
            where: {
                email: newEmail
            }
        })

        if (isUserWithEmailExist) {
            throw { msg: "User with this email is already registered", status: 400 }
        }

        const updateData = prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                email: newEmail
            },
            select: {
                name: true,
                email: true,
                type: true
            }
        });


        reply.code(200).send(successResponse(updateData, "Email changed successfully"))
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}