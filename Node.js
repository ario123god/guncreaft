const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/start-payment', async(req, res) => {
    const { itemName, itemPrice } = req.body;

    try {
        const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/request.json', {
            merchant_id: 'MERCHANT_ID', // Replace with your Zarinpal Merchant ID
            amount: itemPrice,
            description: `خرید ${itemName}`,
            callback_url: 'http://yourdomain.com/verify-payment' // Replace with your callback URL
        });

        const { authority } = response.data.data;
        res.json({ url: `https://www.zarinpal.com/pg/StartPay/${authority}` });
    } catch (error) {
        console.error('Error in payment request:', error);
        res.status(500).json({ error: 'مشکلی در ایجاد پرداخت رخ داده است' });
    }
});

app.get('/verify-payment', async(req, res) => {
    const { Authority: authority, Status: status } = req.query;

    if (status === 'OK') {
        try {
            const response = await axios.post('https://api.zarinpal.com/pg/v4/payment/verify.json', {
                merchant_id: 'MERCHANT_ID', // Replace with your Zarinpal Merchant ID
                authority: authority,
                amount: itemPrice
            });

            if (response.data.data.code === 100) {
                res.redirect('/?status=success');
            } else {
                res.redirect('/?status=failure');
            }
        } catch (error) {
            console.error('Error in payment verification:', error);
            res.redirect('/?status=failure');
        }
    } else {
        res.redirect('/?status=failure');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});