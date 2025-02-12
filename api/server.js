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
      from: process.env.EMAIL, // Your email
      to: process.env.EMAIL, // Email where you receive messages
      subject: `New Contact Message from ${name}`,
      text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email: ", error);  // Log error to console
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

const axios = require("axios");

// Route to fetch Airbnb calendar
app.get("/api/calendar/airbnb", async (req, res) => {
  try {
    const response = await axios.get(process.env.AIRBNB_ICAL_URL);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching Airbnb calendar:", error);
    res.status(500).json({ error: "Failed to fetch calendar data" });
  }
});

// Route to fetch Booking.com calendar
app.get("/api/calendar/booking", async (req, res) => {
  try {
    const response = await axios.get(process.env.BOOKING_ICAL_URL);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching Booking.com calendar:", error);
    res.status(500).json({ error: "Failed to fetch calendar data" });
  }
});

//inquiry


app.listen(5000, () => console.log("Server running on port 5000"));
