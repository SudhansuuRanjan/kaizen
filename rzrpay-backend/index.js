require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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


// send mail on registration confirmation
app.post("/api/sendRegConf", async (req, res) => {
  const { name, kaizenId, events, email } = req.body;
  for (let i = 0; i < events.length; i++) {
    events[i] = (i + 1) + ". " + events[i];
  }

  const courier_options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.APIKEY2,
    },
    body: JSON.stringify({
      message: {
        to: {
          email,
        },
        template: "KDYM9E7XGKMV21MSN1H6KB5E07XB",
        data: {
          name: name,
          kaizenid: kaizenId,
          listofevents: events.join("\n")
        },
        routing: {
          method: "all",
          channels: ["email"],
        },
      },
    }),
  };

  try {
    await fetch("https://api.courier.com/send", courier_options);
    res.status(200).json({ message: "Mail Sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// send mail on purchasing passes
app.post("/api/sendPassMail", async (req, res) => {
  const peoples = req.body;

  for (let i = 0; i < peoples.length; i++) {
    const courier_options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.APIKEY2,
      },
      body: JSON.stringify({
        message: {
          to: {
            email: peoples[i].email,
          },
          template: "JT3V640FK7MBKCGH8TWPDDBBGA6X",
          data: {
            name: peoples[i].name,
            passid: peoples[i].id.toUpperCase(),
          },
          routing: {
            method: "all",
            channels: ["email"],
          },
        },
      }),
    };


    try {
      await fetch("https://api.courier.com/send", courier_options);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  res.status(200).json({ message: "Mail Sent" });
})

// Certificates

// send otp to mail
app.post("/api/verifyEmail", async (req, res) => {
  const { email, otp } = req.body;

  const courier_options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.APIKEY2,
    },
    body: JSON.stringify({
      message: {
        to: {
          email,
        },
        template: "WDA1MAB8DTM2XQG12RCBV28ZS5BB",
        data: {
          code: otp,
        },
        routing: {
          method: "all",
          channels: ["email"],
        },
      },
    }),
  };

  try {
    await fetch("https://api.courier.com/send", courier_options);
    res.status(200).json({ message: "Mail Sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// listen to port
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});

// Export the express API
module.exports = app;
