import ejs from 'ejs';
import transporter from '../../config/emailTransporter.js';

export default async (name, value, email) => {
    try {
        const data = {
            name,
            value
        }
        ejs.renderFile('/home/stark/Projects/CollegeProject/My Project/backend/utils/helpers/sendEmail/otpFile.ejs', data, async (err, html) => {
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
        throw err;
    }
}