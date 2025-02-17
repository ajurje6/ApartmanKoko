require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const cors = require("cors");
const compression = require("compression");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const { check, validationResult } = require("express-validator");

const app = express();
app.use(helmet());
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow only requests from this frontend
  methods: ["GET", "POST"], // Allow only GET and POST methods
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

app.use(express.json()); // Parse incoming JSON

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "script-src 'self' https://maps.googleapis.com; " +
    "style-src 'self' https://fonts.googleapis.com; " +
    "img-src 'self' https://flagcdn.com;"
  );
  next();
});


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send Contact Form Email
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Contact Message from ${name}`,
      text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`,
    });
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

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

// Handle Inquiry Form Submission
app.post(
  "/send-inquiry",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("arrival").notEmpty().withMessage("Arrival date is required"),
    check("departure").notEmpty().withMessage("Departure date is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, surname, email, phone, arrival, departure, message } = req.body;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `New Inquiry from ${name} ${surname}`,
        text: `Name: ${name} ${surname}\nEmail: ${email}\nPhone: ${phone}\nArrival Date: ${arrival}\nDeparture Date: ${departure}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name} ${surname}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Arrival Date:</strong> ${arrival}</p><p><strong>Departure Date:</strong> ${departure}</p><p><strong>Message:</strong><br>${message}</p>`,
      });

      res.status(200).json({ success: true, message: "Inquiry sent successfully!" });
    } catch (error) {
      console.error("Error sending inquiry:", error);
      res.status(500).json({ success: false, message: "Failed to send inquiry." });
    }
  }
);

app.listen(5000, () => console.log("Server running on port 5000"));
