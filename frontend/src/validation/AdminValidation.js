import * as yup from 'yup';

export const supplierSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email('Please enter a valid email').required("Email is required"),
    mobile: yup.string().min(10).max(12).required(),
})

export const workerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email("Enter a valid email").required(),
    mobile: yup.string().min(10).max(12).required(),
    password: yup.string().min(4).required()
})

export const productSchema = yup.object().shape({
    name: yup.string().required(),
    quantity: yup.number().min(0).required(),
    unitPrice: yup.number().min(0).required(),
    description: yup.string().min(10),
    weight: yup.number().required(),
    colorId: yup.string().required("Color is required"),
    brandId: yup.string().required("Brand is required"),
    supplierId: yup.string().required("Supplier is required"),
    categoryId: yup.string().required("Category is required")
})