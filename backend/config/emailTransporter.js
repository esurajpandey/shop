import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export default nodemailer.createTransport({
    host: 'smtp.gmail.com',
    post: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD,
    }
})