const express = require("express");
const pool = require("./db");
require("dotenv").config();

const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuItemRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


app.use("/restaurants", restaurantRoutes);
app.use(menuRoutes); 
app.use(customerRoutes);
app.use(orderRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
