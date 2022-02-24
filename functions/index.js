const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
//const { request } = require("express");
//const { response } = require("express");
const stripe = require("stripe")('sk_test_51KU73TSCeqXrJflU9QIsR7imNUYhnP6z8989d3SOPgOhkVwVrtFP2XbAHQGErXUHU0BnrChz4Re1KQ1ucPhxbZ1800ma8rZZam')

// API

// - App Config
const app = express();

// - Middlewares
app.use(cors({origin:true}));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

//app.get('/ankita', (request, response) => response.status(200).send('whats up guys'))

app.post("/payments/create", async (request, response)=> {
    const total = request.query.total;

    console.log('Payment Request Received BOOM!! for this amount >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "inr",
    });
    
    //ok  - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });

});
// - Listen command
exports.api = functions.https.onRequest(app)

//Example end point
//http://localhost:5001/clone-3e4e9/us-central1/api
//that error was huge token mmissing check this link 
//https://stackoverflow.com/posts/65755871/revisions
//just need to remove bad scriipts from package.json