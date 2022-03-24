require("dotenv").config();

const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = async (toUser, hash) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });
  const message = {
    from: process.env.GOOGLE_USER,
    to: toUser,
    subject: "Your App - Activate Account",
    html: `
        <h3> Hello ${toUser} </h3>
        <p>Thank you for registering into X3Fable. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="http://${process.env.host}/account/activate/${hash}">Activate </a></p>
        <p>Cheers</p>
        <p>Your X3Fable Team</p>
      `,
  };
  await transporter.sendMail(message);
};
