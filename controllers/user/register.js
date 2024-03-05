import prisma from '../../init/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/helper/jwtHelper.js';
import { errorResponse, successResponse } from '../../utils/helper/response.js';
import sendOtp from '../../utils/email/sendOtp.js';
import generateOTP from '../../utils/helper/generateOtp.js';

export default async (req, reply) => {
    const { name, email, password, mobile } = req.body;
    try {

        const hashPassword = bcrypt.hashSync(password, 10);
        const isUserExist = await prisma.user.findUnique({ where: { email } });

        if (isUserExist)
            throw { msg: "User is already registered", status: 409 };
        if (mobile.length > 10) {
            throw { mgs: "Invalid mobile number", status: 400 }
        }


        const otpValue = generateOTP();
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                name,
                mobile,
                password: hashPassword,
                otp: {
                    create: {
                        expireIn: 10,
                        value: +otpValue
                    }
                }
            },
            select: {
                id: true,
                email: true,
                mobile: true,
                name: true,
                isEmailVerified: true,
                type: true,
                otp: true
            }
        });

        if (!user)
            throw { msg: "Unable to register!", status: 422 };

        await sendOtp(user?.name, user?.otp?.value, user?.email);
        const token = generateToken({ id: user?.id });

        user.otp = null;
        let responseData = successResponse(user, "User is registered");
        responseData.token = token;
        reply
            .code(201)
            .send(responseData);

    } catch (err) {
        if (err.code === 'P2002') {
            err.msg = "Mobile number alredy registered";
            err.status = 400;
        }
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}