require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const path = require("path");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const qr = require('qrcode');
const fileUpload = require("express-fileupload");
const imgbbUploader = require("imgbb-uploader");
const fs = require("fs");

// express app
const app = express();
var allowedOrigins = ['https://kaizen-admin.vercel.app/',
                      'https://kaizenaiimspatna.com/'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// razorpay instance
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generatePassID = () => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var string_length = 10;
  var randomstring = '';
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

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
  const people = req.body;
  // console.log(people);

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
          email: people.email,
        },
        template: "JT3V640FK7MBKCGH8TWPDDBBGA6X",
        data: {
          name: people.name,
          brid: people.passId,
          link: "https://kaizenaiimspatna.com/br/" + people.id,
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

  res.status(200).json({ message: "Mail Sent" });
})



// send alumni mail 
app.post("/api/sendAlumniMail", async (req, res) => {
  const people = req.body;
  // console.log(people);

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
          email: people.email,
        },
        template: "HSW2487G984YAPGMHVNN2GQ6VVJG",
        data:{

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

// generate qr from id
app.post("/api/generatePasses", async (req, res) => {
  const { peoples } = req.body;

  // generate pass id and qr code
  try {
    const promises = peoples.map(async (person) => {
      const passId = generatePassID();
      const uploadPath = path.join(__dirname, "uploads", passId + ".png");

      await new Promise((resolve, reject) => {
        qr.toFile(uploadPath, "https://kaizenaiimspatna.com/br/" + passId, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      const data = await imgbbUploader(process.env.API_KEY, uploadPath);
      person.passId = passId;
      person.passQr = data.url;
      // console.log(data);
      fs.unlinkSync(uploadPath);
    });

    await Promise.all(promises);
    res.status(200).json({ message: "Mail Sent", peoples });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})



// listen to port
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});

// Export the express API
module.exports = app;
