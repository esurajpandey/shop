import prisma from "../../init/db.js";
import bcrypt from 'bcrypt';
import { errorResponse, successResponse } from "../../utils/helper/response.js";
import { generateToken } from '../../utils/helper/jwtHelper.js';

export default async (req, reply) => {
    try {
        const { email, password } = req.body;
        console.log("Hello");
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user)
            throw { msg: "User not found", status: 404 };

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect)
            throw { msg: "Invalid credentials", status: 401 };

        //user related data;
        const userDetails = await prisma.user.findUnique({
            where: { id: user?.id }, select: {
                address: true,
                name: true,
                id: true,
                email: true,
                mobile: true,
                isEmailVerified: true,
                cartItem: {
                    select: {
                        product: true,
                        quantity: true,
                        createdAt: true
                    }
                },
                orders: {
                    select: {
                        address: true,
                        orderAt: true,
                        status: true,
                        OrderItem: {
                            select: {
                                product: true
                            }
                        }
                    }
                }
            }
        });

        if (!userDetails)
            throw { msg: "Unable to login", status: 422 };

        const respObj = successResponse(userDetails, "User logged in success");
        respObj.token = generateToken({ id: userDetails.id });

        reply.code(200).send(respObj)
    } catch (err) {
        reply.code(err?.status ?? 500).send(errorResponse(err));
    }
}