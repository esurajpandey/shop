import razorpay from "../../config/razorpay.js"
export default async (orderId, amount, user) => {
    // console.log(orderId, amount, user)
    const options = {
        amount: Number(amount * 100),
        currency: "INR",
        notes: {
            orderId
        }
    };

    const paymentLink = await razorpay.orders.create(options);
    return paymentLink;
}