const paymentKey = import.meta.env.VITE_payment_key;
const baseUrl = import.meta.env.VITE_defaultURL;
export default (order, user) => {
    const options = {
        paymentKey, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Stark Electric Shop",
        description: "Payment for your product",
        image: "",
        order_id: order.id,
        callback_url: `${baseUrl}/order/verify-payment?orderId=${order.notes.orderId}`,
        prefill: {
            name: user.name,
            email: user.email,
        },
        notes: {
            address: "Razorpay Corporate Office",
        },
        theme: {
            color: "#3399cc",
        },
    };

    return options;
}