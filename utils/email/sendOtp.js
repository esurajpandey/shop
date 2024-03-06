import ejs from 'ejs';
import transporter from '../../config/emailTransporter.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
export default async (name, value, email) => {
    try {
        const data = {
            name,
            value
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const filePath = path.join(__dirname, 'otp.ejs');
        ejs.renderFile(filePath, data, async (err, html) => {
            if (err) {
                console.log("Html rendering file", err.message);
                throw err;
            } else {
                const mailOptions = {
                    from: process.env.USER_EMAIL,
                    to: email,
                    subject: "Verify your email",
                    html: html,
                    dsn: {
                        id: 'Not sent',
                        return: 'full',
                        notify: ['failure'],
                        recipient: process.env.USER_EMAIL
                    }
                }
                return await transporter.sendMail(mailOptions);
            }
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}