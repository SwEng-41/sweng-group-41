const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);
const endpointSecret = STRIPE_ENDPOINT_SECRET;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require("axios").default;
const env = process.env;
var corsOptions = {
    origin: env.ACCOUNTS_BASE_URL,
    optionsSuccessStatus: 200
};
const app = express();
app.use(express.static('.'));

const basePath = env.BASE_PATH || '';

app.get(`${basePath}/health`, async (_, res) => res.status(204).end());

app.options(`${basePath}/create-session`, cors(corsOptions));

app.post(`${basePath}/create-session`, bodyParser.json(), cors(corsOptions), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Netsoc Membership',
                        images: [env.NAT_URL],
                    },
                    unit_amount: parseInt(env.UNIT_AMOUNT),
                },
                quantity: 1,
            },
        ],
        client_reference_id: req.body.uid,
        mode: 'payment',
        success_url: `${env.ACCOUNTS_BASE_URL}${env.SUCCESS_URL}`,
        cancel_url: `${env.ACCOUNTS_BASE_URL}${env.CANCEL_URL}`,
    });
    res.json({ id: session.id });
});

const updateUser = (session) => {
    let rightNowLol = (new Date()).toISOString();
    axios.patch(`${env.IAM_BASE_URL}${env.UPDATE_URL}${session.client_reference_id}`, {
        renewed: rightNowLol
    }, {
        headers: {
            "Authorization": `Bearer ${env.IAM_JWT}`
        }
    }).then(res => console.log(res))
        .catch(res => console.error(res));
};

app.post(`${basePath}/webhook`, bodyParser.raw({ type: 'application/json' }), (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        updateUser(session);
    }

    response.status(204).end();
});

const server = app.listen(env.SERVER_PORT, () => console.log(`Running on port ${env.SERVER_PORT}`));

const shutdown = () => server.close();
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);