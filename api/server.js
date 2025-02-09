require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow only requests from this frontend
  methods: ["GET", "POST"], // Allow only GET and POST methods
  allowedHeaders: ["Content-Type"], // Allow only Content-Type header
};

app.use(cors(corsOptions)); // Use the CORS configuration
app.use(express.json()); // Parse incoming JSON

// Log the email and password to verify they are loaded correctly
console.log("Email:", process.env.EMAIL);
console.log("Password:", process.env.EMAIL_PASSWORD);
// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail's SMTP host
    port: 587, // SMTP port (587 for TLS, 465 for SSL)
    secure: false, // use TLS
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL, // Your email where you receive messages
      subject: `New Contact Message from ${name}`,
      text: message,
    });
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email: ", error);  // Log error to console
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
