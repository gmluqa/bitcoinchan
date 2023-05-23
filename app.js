const express = require("express");
const jwt = require("jsonwebtoken");
const Web3 = require("web3");
require("dotenv").config();

const app = express();
app.use(express.json());

// dotenv vars
const jwtSecret = process.env.ETHEREUM_NODE_URL; // TODO: DEFINE jwt if gonna use
const nodeUrlSecret = process.env.ETHEREUM_NODE_URL;

// Initialize Web3 with your Ethereum node URL
const web3 = new Web3(nodeUrlSecret);

// Endpoint for verifying user holdings
app.post("/verify_holdings", (req, res) => {
  // Here, you would implement the logic to verify the user's bitcoin holdings
  // and check if they meet the minimum requirement of 186,000 bitcoins.
  // Assuming the verification is successful, generate and return a JWT token.

  const token = jwt.sign({ userId: req.body.userId }, jwtSecret, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Middleware to check the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

// Protected endpoint for creating a thread
app.post("/thread", authenticateToken, (req, res) => {
  // Here, you can implement the logic to create a thread.
  // Only users with a valid and verified JWT token can access this endpoint.
  res.json({ message: "Thread created successfully" });
});

// Protected endpoint for replying to a thread
app.post("/reply", authenticateToken, (req, res) => {
  // Here, you can implement the logic to post a reply to a thread.
  // Only users with a valid and verified JWT token can access this endpoint.
  res.json({ message: "Reply posted successfully" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
