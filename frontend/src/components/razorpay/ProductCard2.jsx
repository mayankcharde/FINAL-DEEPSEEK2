import { useState } from "react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard2() {
    const [amount, setamount] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handlePrintBill = () => {
        window.print();
    };

    // handlePayment Function
    const handlePayment = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount
                })
            });

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Deepseek",
            description: "Go Plan Subscription",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    if (showConfirmation) {
        return (
            <div className="w-96 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-2xl border border-slate-700">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">Payment Confirmation</h2>
                    
                    {/* Subscription Details */}
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-3 text-blue-400">Go Subscription</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Plan:</span>
                                <span className="font-medium">Go Monthly</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Duration:</span>
                                <span className="font-medium">1 Month</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Features:</span>
                                <span className="font-medium text-green-400">Enhanced AI</span>
                            </div>
                        </div>
                    </div>

                    {/* Bill Details */}
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-blue-400">Bill Summary</h3>
                            <button 
                                onClick={handlePrintBill}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                            >
                                Print Bill
                            </button>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹1</span>
                            </div>
                            <div className="flex justify-between">
                                <span>GST (18%):</span>
                                <span>₹1</span>
                            </div>
                            <div className="border-t border-slate-600 pt-2 mt-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span className="text-green-400">₹1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button 
                            onClick={handlePayment} 
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            Proceed to Payment
                        </button>
                        <button 
                            onClick={() => setShowConfirmation(false)}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
                        >
                            Back to Details
                        </button>
                    </div>
                </div>
                <Toaster/>
            </div>
        );
    }

    return (
        <div className="w-96 bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-xl shadow-2xl border border-blue-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-xl text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold">Go Subscription</h2>
                <p className="text-blue-100 mt-2">Enhanced AI for power users</p>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">₹1</div>
                    <div className="text-slate-400">/month (inclusive of GST)</div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        Access to Deepseek Advanced Model
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        Expanded messaging and uploads
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        Expanded and faster image creation
                    </div>
                    <div className="flex items-center text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        Projects, tasks, custom Deepseek
                    </div>
                </div>

                <button 
                    onClick={() => setShowConfirmation(true)} 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                    Upgrade to Go
                </button>
            </div>
            <Toaster/>
        </div>
    )
}