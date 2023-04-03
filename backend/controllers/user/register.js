import prisma from '../../init/db.js';
import bcrypt from 'bcrypt';
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

        const otpValue = generateOTP();

        const user = await prisma.user.create({
            data: {
                email,
                name,
                mobile,
                password: hashPassword,
                otp: {
                    create: {
                        value: +otpValue,
                        expireIn: 10
                    }
                }
            },
            select: {
                id: true,
                email: true,
                mobile: true,
                name: true,
                otp: true
            }
        });

        if (!user)
            throw { msg: "Unable to register!", status: 422 };

        await sendOtp(user?.name, user?.otp?.value, user?.email);
        const token = generateToken({ id: user?.id });

        user.otp = null;
        let responseData = successResponse(user, "User is registered"); responseData
        responseData.token = token;

        reply
            .code(201)
            .send(responseData);

    } catch (err) {
        reply
            .code(err?.status ?? 500).send(errorResponse(err));
    }
}