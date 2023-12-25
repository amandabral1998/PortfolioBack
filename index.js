const express = require("express");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("HomePage");
});

app.post("/send-mail", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(name, email, subject, message);

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    debug: true,
    auth: {
      user: "amandabral5@gmail.com",
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: "amandabral5@gmail.com",
    subject: subject,
    html: `<p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send({
        statue: false,
        message: "Something went wrong.",
      });
    } else {
      console.log("Email sent: " + info.response);
      res.send({
        statue: true,
        message: "Successfully Sent Email.",
      });
    }
  });
});

app.listen(3000 || process.env.PORT, () => {
  console.log("Server Started");
});
