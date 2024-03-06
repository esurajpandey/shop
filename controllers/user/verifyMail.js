import prisma from "../../init/db.js";
import { generateToken } from "../../utils/helper/jwtHelper.js";
import { errorResponse, successResponse } from "../../utils/helper/response.js";


export function isValidOtp(expiredIn, creationTime) {
    // Set the expiration period to 10 minutes (600,000 milliseconds)
    const expirationPeriod = expiredIn * 60 * 1000;

    // Calculate the expiration time based on the creation time and the expiration period
    const expirationTime = creationTime.getTime() + expirationPeriod;

    const currentTime = new Date().getTime();

    // Check if the current time is greater than the expiration time
    if (currentTime > expirationTime) {
        return false; // OTP is  expired
    } else {
        return true; // OTP is not expired
    }
}

export default async (req, reply) => {
    try {
        // console.log(req.body);
        const responseObj = await verify(req);
        reply.code(200).send(responseObj);
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}

const verify = async (req) => {
    return prisma.$transaction(async tx => {
        let { email, otp } = req.body;
        otp = +otp;

        let user = await tx.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                name: true,
                email: true,
                otp: true,
                isEmailVerified: true,
            }
        });

        if (!user) {
            throw { msg: "User not found", status: 404 };
        }

        if (user.isEmailVerified === true)
            throw { msg: "This email is already verified!", status: 400 };

        if (!user?.otp?.id)
            throw { msg: "Invalid otp", status: 400 };

        //check expiry data
        const isValid = isValidOtp(user?.otp?.expireIn, user?.otp?.createdAt);
        if (!isValid)
            throw { msg: "Otp is expired.", status: 400 };

        if (otp !== user?.otp?.value)
            throw { msg: "Incorrect Otp", status: 400 };


        //now delete the otp and update the user details as isMailVerofied as true

        await tx.otp.delete({
            where: {
                id: user?.otp?.id
            }
        });
        user = await tx.user.update({
            where: {
                id: user?.id
            },
            data: {
                isEmailVerified: true,
                otpId: null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                isEmailVerified: true,
                type: true,
            }
        });


        const responseObj = successResponse(user, "Email is verified successfully");
        responseObj.token = generateToken({ id: user.id });

        return responseObj;
    },{
        maxWait :8000,
        timeout : 7000
    });
}