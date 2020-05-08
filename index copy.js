if (process.env.NODE_DEV !== "production") require("dotenv").config();

let fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const router = express.Router();
const path = require("path");
const {createOrder} = require("./payment/razorpayPayment");
const razorpay =require ("razorpay");


const stripe = require("stripe")("sk_test_NXjRoyKxHvWWfE9aDc5n73VL00zS3jEpHr");

app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(path.resolve(__dirname, "index.html"));

});
app.get("/admission.html", function (req, res) {
  res.sendFile(path.resolve(__dirname, "admission.html"));

});
app.get("/paymentpage", function (req, res) {
  res.sendFile(path.resolve(__dirname, "paymentPage.html"));
  
});
app.get("/paymentcheckout", function (req, res ,next) {
  createOrder();
 
 
 res.sendFile(path.resolve(__dirname, "paymentPage.html"));

  

});

var createCustomer = function () {
  var param = {};
  param.email = "rk@gmail.com";
  param.name = "Rohit ";
  param.description = "testing";

  stripe.customers.create(param, function (err, customer) {
    if (err) {
      console.log("err", err);
    }
    if (customer) {
      console.log("success", customer);
    } else {
      console.log("something went wrong");
    }
  });
};

//createCustomer();
var retrieveCustomer = function () {
  stripe.customers.retrieve("cus_HELnCbwO8FoMS5", function (err, customer) {
    if (err) {
      console.log("err", err);
    }
    if (customer) {
      console.log("success", customer);
    } else {
      console.log("something went wrong");
    }
  });
};

//retrieveCustomer();

var createToken = function () {
  var param = {};
  param.card = {
    number: "4242424242424242",
    currency: "INR",
    exp_month: 2,
    exp_year: 2024,
    cvc: "212",
  };

  stripe.tokens.create(param, function (err, token) {
    if (err) {
      console.log("err", err);
    }
    if (token) {
      console.log("success", token);
    } else {
      console.log("something went wrong");
    }
  });
};

//createToken();

var addCardToCustomer = function () {
  stripe.customers.createSource(
    "cus_HELnCbwO8FoMS5",
    { source: "tok_1GfuN9C5Q3B74qqxlVzJktGG" },
    function (err, card) {
      if (err) {
        console.log("err", err);
      }
      if (card) {
        console.log("success", card);
      } else {
        console.log("something went wrong");
      }
    }
  );
};

//addCardToCustomer();

var chargeCustomerThroughCustomerId = function () {
  var param = {};
  param = {
    amount: "2000",
    currency: "inr",
    description: "First Payment",
    customer: "cus_HELnCbwO8FoMS5",
  };

  stripe.charges.create(param, function (err, charge) {
    if (err) {
      console.log("err", err);
    }
    if (charge) {
      console.log("success", charge);
    } else {
      console.log("something went wrong");
    }
  });
};

//chargeCustomerThroughCustomerId();

var chargeCustomerThroughTokenId = function () {
  var param = {};
  param = {
    amount: "2000",
    currency: "inr",
    description: "First Payment",
    source: "tok_1GfuYoC5Q3B74qqxYlR1Xdkl",
  };

  stripe.charges.create(param, function (err, charge) {
    if (err) {
      console.log("err", err);
    }
    if (charge) {
      console.log("success", charge);
    } else {
      console.log("something went wrong");
    }
  });
};









//********************* */ createOrder();

//chargeCustomerThroughTokenId();
/*

router.get("/", function (req, res) {
  
  res.render('index.html' ,{
    stripePublicKey :stripePublicKey
  })
  //__dirname : It will resolve to your project folder.
});
app.get('/checkout', function (req, res) {
  
  res.render('index.html' ,{
    stripePublicKey :stripePublicKey
  })
  //__dirname : It will resolve to your project folder.
});*/

/*
const session =  stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    name: 'T-shirt',
    description: 'Comfortable cotton t-shirt',
    images: ['https://example.com/t-shirt.png'],
    amount: 500,
    currency: 'inr',
    quantity: 1,
  }],
  success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://example.com/cancel',
});
*/

// MY PORT
const port = 6000;

// STARTING A SERVER
app.listen(1000, () => {
  console.log(`app is running at ${1000}`);
  // `${}`  ==this called bacticks(may misspell)
  // used to use var in string
});
