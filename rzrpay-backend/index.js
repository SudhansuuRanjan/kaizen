require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const path = require("path");

// express app
const app = express();
app.use(cors());
app.use(express.json());

// razorpay instance
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// get request to respond hello world
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get request to send kaizen logo
app.get("/api/kaizen.png", function (req, res) {
  res.sendFile(path.join(__dirname, "kaizen1.png"));
});

// post request to create order
app.post("/api/paymentgateway", (req, res) => {
  const options = {
    amount: Number(req.body.amount) * 100, // amount in smallest currency unit
    currency: req.body.currency,
    receipt: shortid.generate(),
    partial_payment: false,
    notes: {
      userName: req.body.name,
      userEmail: req.body.email,
      contact: req.body.contact,
    },
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
    } else {
      console.log(order);
      res.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    }
  });
});

// listen to port
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});

// Export the express API
module.exports = app;
