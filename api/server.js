require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const cors = require("cors");
const compression = require("compression");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const { check, validationResult } = require("express-validator");
const path = require("path");

const app = express();
app.use(helmet());
app.use(compression());
const __dirname = path.resolve();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:49721", // Local development
    "https://apartmankoko-makarska.onrender.com", // Deployed frontend
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

app.use(express.json()); // Parse incoming JSON

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
});
app.use(limiter);


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

// API Routes
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
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

// Fetch Airbnb Calendar
app.get("/api/calendar/airbnb", async (req, res) => {
  try {
    const response = await axios.get(process.env.AIRBNB_ICAL_URL);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching Airbnb calendar:", error);
    res.status(500).json({ error: "Failed to fetch calendar data" });
  }
});

// Fetch Booking.com Calendar
app.get("/api/calendar/booking", async (req, res) => {
  try {
    const response = await axios.get(process.env.BOOKING_ICAL_URL);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching Booking.com calendar:", error);
    res.status(500).json({ error: "Failed to fetch calendar data" });
  }
});

// Inquiry Form Submission
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

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname,'client', 'dist')));
// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

