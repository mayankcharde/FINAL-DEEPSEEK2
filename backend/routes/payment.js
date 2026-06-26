import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import Payment from '../models/payment.js';

const router = express.Router();

// ✅ Lazy initialization — avoids ES module hoisting issue where
// this file is imported BEFORE dotenv.config() runs in server.js.
// The instance is created on first request, when env vars are ready.
let _razorpayInstance = null;
function getRazorpay() {
    if (!_razorpayInstance) {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_SECRET;
        if (!keyId || !keySecret) {
            throw new Error(`Razorpay env vars missing — KEY_ID: ${keyId ? 'SET' : 'MISSING'}, SECRET: ${keySecret ? 'SET' : 'MISSING'}`);
        }
        _razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret });
        console.log('✅ Razorpay initialized with key:', keyId);
    }
    return _razorpayInstance;
}

// DIAGNOSTIC: Verify keys are loaded (never exposes secret)
router.get('/ping', (req, res) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secretLoaded = !!process.env.RAZORPAY_SECRET;
    res.json({
        keyId: keyId || 'NOT SET',
        secretLoaded,
        keyType: keyId ? (keyId.startsWith('rzp_live_') ? 'LIVE' : 'TEST') : 'UNKNOWN',
    });
});

// ROUTE 1 : Create Order Api Using POST Method http://localhost:5000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const razorpayInstance = getRazorpay(); // lazy — env vars guaranteed loaded by now

        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        console.log('🔑 Razorpay Key:', process.env.RAZORPAY_KEY_ID);
        console.log('📦 Order options:', options);

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error('❌ Razorpay order error (full):', JSON.stringify(error, null, 2));
                return res.status(500).json({
                    message: "Something Went Wrong!",
                    razorpayError: error.error || error.message || error,
                    description: error.error?.description || "",
                });
            }
            console.log('✅ Order created:', order);
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.error('❌ Internal error in /order:', error.message);
        res.status(500).json({ message: error.message || "Internal Server Error!" });
    }
})

// ROUTE 2 : Create Verify Api Using POST Method http://localhost:4000/api/payment/verify
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // console.log("req.body", req.body);

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save Payment 
            await payment.save();

            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})

export default router