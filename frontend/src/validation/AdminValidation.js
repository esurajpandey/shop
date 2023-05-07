import * as Yup from 'yup';

export const supplierSchema = Yup.object().shape({
    name: Yup.string().required("Supplier name is required").matches(/^[a-zA-Z]+$/, 'Name should only contain alphabetical characters'),
    email: Yup.string().matches(
        /^[A-Z0-9._%+-]+@[A-Z.]+\.(com|edu|in)$/i,
        'Invalid email address'
    ).email('Please enter a valid email').required("Email is required"),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Mobile number is not valid').min(10).required(),
})

export const workerSchema = Yup.object().shape({
    name: Yup.string().required("worker name is required").matches(/^[a-zA-Z]+$/, 'Name should only contain alphabetical characters'),
    email: Yup.string().matches(
        /^[A-Z0-9._%+-]+@[A-Z.]+\.(com|edu|in)$/i,
        'Invalid email address'
    ).email("Enter a valid email").required(),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Mobile number is not valid').min(10).required(),
    password: Yup.string().min(4).required()
})

export const productSchema = Yup.object().shape({
    name: Yup.string().required(),
    quantity: Yup.number().min(0).required(),
    unitPrice: Yup.number().min(0).required(),
    description: Yup.string().min(10),
    weight: Yup.number().required(),
    colorId: Yup.string().required("Color is required"),
    brandId: Yup.string().required("Brand is required"),
    supplierId: Yup.string().required("Supplier is required"),
    categoryId: Yup.string().required("Category is required")
})

export const productUpdateSchema = Yup.object().shape({
    name: Yup.string().required(),
    quantityInStock: Yup.number().min(0).required(),
    unitPrice: Yup.number().min(0).required()
})