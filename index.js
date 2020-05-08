const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { config, engine } = require("express-edge");
const razorpay = require("razorpay");
const { createOrder, createUser } = require("./controller/paymentPage");
const { updateOrder } = require("./controller/updateOrder");
const { findOrderById } = require("./controller/getOrder");
const { verifysignatures } = require("./controller/signatureVerify");

const { check, validationResult } = require("express-validator");

const mongoose = require("mongoose");

const app = new express();

app.use(engine);

app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  res.render("thanks");
});
app.get("/admission", (req, res) => {
  res.render("admission");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/payment/successful", verifysignatures, updateOrder, (req, res) =>
  res.render("thanks")
);

app.post(
  "/admission",

 [ check("email").isEmail().withMessage("enter correct email"),
  check("studentname")
    .isLength({ min: 3 })
    .withMessage("name must contain atleast 3 character"),
  check("guardiannamename")
    .isLength({ min: 3 })
    .withMessage("name must contain atleast 3 character"),
  check("contact")
    .isLength({ min: 10 })
    .withMessage("Please enter valid contact detail"),
  check("aadhar")
    .isLength(12)
    .withMessage("Please enter valid adhar card detail")],

  createUser
);

app.listen(3000, () => {
  console.log("App listening at port 3000");
});
