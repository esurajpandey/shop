import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email('Enter a valid email').required(),
    mobile: yup.string().min(10).max(12).required(),
    password: yup.string().min(4, 'Password must be at least 4 characters long').required(),
    cnfPassword: yup.string().oneOf([yup.ref('password'), null], "Password doesn't matched").required()
})