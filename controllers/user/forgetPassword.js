import prisma from "../../init/db.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";
import generateOTP from "../../utils/helper/generateOtp.js";
import sendOtp from "../../utils/email/sendOtp.js";

export default async (req, reply) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw { msg: "User not found", status: 404 };
        }

        const otpValue = generateOTP();

        const updateUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                otp: {
                    create: {
                        expireIn: 10,
                        value: +otpValue
                    }
                }
            },
            select: {
                otp: true,
                email: true,
                name: true,

            }
        });

        if (!updateUser)
            throw { msg: "Unable to reset password!", status: 422 };

        await sendOtp(updateUser?.name, updateUser?.otp?.value, updateUser?.email);
        reply
            .code(201)
            .send(successResponse({}, "Otp has been sent to register email"));
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}