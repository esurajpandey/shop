import prisma from "../../init/db.js";
import generateOTP from "../../utils/helper/generateOtp.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";
import sendOtp from "../../utils/email/sendOtp.js";

export default async (req, reply) => {
    try {
        console.log("Hello");
        const responseObj = await sendNew(req);
        reply.code(200).send(responseObj);
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}


const sendNew = async (req) => {
    return prisma.$transaction(async tx => {
        const { email } = req.body;
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user)
            throw { msg: "User not found", status: 404 };

        //if user sending more than one than delete all previous

        if (user.isEmailVerified)
            throw { msg: "Email is already verified", status: 400 };

        const otpValue = generateOTP();

        user = await tx.user.update({
            where: {
                id: user?.id
            },
            data: {
                otp: {
                    create: {
                        expireIn: 10,
                        value: +otpValue
                    }
                },
                isEmailVerified: false
            },
            select: {
                name: true,
                email: true,
                otp: true
            }
        });
        try{
            await sendOtp(user?.name, user.otp.value, user?.email);
        }catch(err){
            throw {msg : err.message,status : 422}
        }

        const responseObj = successResponse(null, "New otp is sent to email");
        return responseObj;
    })
}