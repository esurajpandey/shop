import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string().matches(/^[a-zA-Z ]+$/, 'Name should only contain alphabetical characters').required(),
    email: yup.string().matches(
        /^[A-Z0-9._%+-]+@[A-Z.]+\.(com|edu|in)$/i,
        'Invalid email address'
    ).email('Enter a valid email').required(),
    mobile: yup.string().matches(/^[6-9]\d{9}$/, 'Invalid mobile number').min(10).required(),
    password: yup.string().min(4, 'Password must be at least 4 characters long').required(),
    cnfPassword: yup.string().oneOf([yup.ref('password'), null], "Password doesn't matched").required()
})

export const AddressSchema = yup.object().shape({
    id: yup.string(),
    city: yup.string().required(),
    address_line1: yup.string().required('Address details are required'),
    country: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required("Zip code is required"),
    country: yup.string().required(),
})

export const ChangePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required("Current password is required"),
    newPassword: yup.string().required("New password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], "Password doesn't matched").required("Confirm password is required")
})

export const ChangeEmailSchema = yup.object().shape({
    newEmail: yup.string().email().required("New email is required"),
    password: yup.string().required()
})