const orderModel = require("../models/orderModel");

const placeOrder = async (req, res) => {
  const { customerId, restaurantId, items } = req.body;

  if (
    !customerId ||
    !restaurantId ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const order = await orderModel.createOrder(customerId, restaurantId, items);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const getOrdersForCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await orderModel.getOrdersByCustomer(id);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch customer orders" });
  }
};

const changeOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await orderModel.updateOrderStatus(id, status);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await orderModel.deleteOrder(id);
    res.json({ message: "Order canceled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to cancel order" });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrdersForCustomer,
  changeOrderStatus,
  cancelOrder,
};
