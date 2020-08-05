const express = require("express");
const dotenv = require("dotenv");
const logRequestStart = require("./middleware/logger");
const connectDB = require("./config/db");
// Load Evn
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();
const app = express();

// Body Parser
app.use(express.json());

// Middlewares
app.use(logRequestStart);

// Routes
app.use("/api/v1/bootcamps", require("./routes/bootcamps"));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
