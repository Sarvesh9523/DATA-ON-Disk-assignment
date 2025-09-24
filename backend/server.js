const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create "orders" folder if it doesn't exist
const ordersDir = path.join(__dirname, "orders");
if (!fs.existsSync(ordersDir)) fs.mkdirSync(ordersDir);

const ordersFile = path.join(ordersDir, "orders.json");

// POST endpoint to save order
app.post("/api/orders", (req, res) => {
  const order = req.body;

  let orders = [];
  if (fs.existsSync(ordersFile)) {
    const data = fs.readFileSync(ordersFile);
    orders = JSON.parse(data);
  }

  orders.push(order);

  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  res.status(200).json({ message: "Order saved successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
