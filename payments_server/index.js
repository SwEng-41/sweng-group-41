// Read in private keys from environment variables
const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;
const endpointSecret = STRIPE_ENDPOINT_SECRET;

// Initialisation of payment server
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const env = process.env;
const app = express();
const axios = require('axios');
const basePath = env.BASE_PATH || '';

var corsOptions = {
  origin: env.ACCOUNTS_BASE_URL,
  optionsSuccessStatus: 200
};

app.use(express.static('.'));

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
            name: 'NetSoc Membership',
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
})


const updateUser = (session) => {
  let currentTime = (new Date()).toISOString();
  axios.patch(`${env.IAM_BASE_URL}${env.UPDATE_URL}${session.client_reference_id}`, {
      renewed: currentTime
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