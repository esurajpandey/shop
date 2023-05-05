import prisma from "../../init/db.js";
import { successResponse, errorResponse } from "../../utils/helper/response.js";
import { isValidOtp } from "./verifyMail.js";
import bcrypt from 'bcrypt';

export default async (req, reply) => {
    try {
        const { password, otp, email } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                otp: true,
            }
        });


        const isValid = isValidOtp(user?.otp?.expireIn, user?.otp?.createdAt);
        if (!isValid)
            throw { msg: "Otp is expired.", status: 400 };


        if (+otp !== user?.otp?.value)
            throw { msg: "Incorrect Otp", status: 400 };

        console.log(user);
        const hashPassword = bcrypt.hashSync(password, 10);
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashPassword
            }
        });
        console.log(2)
        const d = await prisma.otp.delete({
            where: {
                id: user.otp.id
            }
        })

        console.log(d);

        if (!updatedUser) {
            throw { msg: "Unable to reset password! try after sometime", status: 422 }
        }

        reply.code(200).send(successResponse(null, "Password has been reset successfully"));
    } catch (err) {
        console.log(err)
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}
