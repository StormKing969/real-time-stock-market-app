import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "@/lib/nodemailer/templates";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE
      .replace("{{name}}", name)
      .replace("{{intro}}", intro);

  const mailOptions = {
    from:
      "Signalist - Stock Market Tracker <" + process.env.NODEMAILER_EMAIL + ">",
    to: email,
    subject: "Welcome to Signalist - A Stock Market Tracker!",
    text: `Welcome to Signalist, ${name}! We're excited to have you on board.\n\n${intro}\n\nBest regards,\nThe Signalist Team`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};