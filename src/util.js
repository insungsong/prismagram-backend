import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./word";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randonNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randonNumber]} ${nouns[randonNumber]}`;
};

console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
console.log(sgTransport);

export const sendMail = (email) => {
  //console.log(email);
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email, function(error, info) {
    if (error) {
      console.log(error);
    }
    if (info) {
      console.log(info);
    }
  });
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "whyirofficial@gmail.com",
    to: address,
    subject: "🔒Login Secret for Prismagram 🔒",
    html: `Hello! Your login secret is <b>${secret}</b><br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
