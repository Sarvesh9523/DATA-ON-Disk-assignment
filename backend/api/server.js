const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { kv } = require("@vercel/kv"); 

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to save order
// The function must be async to use 'await'
app.post("/api/orders", async (req, res) => {
  const newOrder = req.body;

  try {
    // ✅ Get existing orders from the KV store, instead of reading a file
    let orders = await kv.get('orders');

    // If no orders exist yet, initialize an empty array
    if (!orders) {
      orders = [];
    }

    // Add the new order
    orders.push(newOrder);

    // ✅ Save the updated array back to the KV store, instead of writing to a file
    await kv.set('orders', orders);

    res.status(200).json({ message: "Order saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save order." });
  }
});

// GET endpoint to retrieve all orders (optional, but useful)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await kv.get('orders');
    res.status(200).json(orders || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve orders." });
  }
});


module.exports = app; // ✅ Export the app for Vercel