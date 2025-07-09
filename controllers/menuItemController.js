const menuModel = require("../models/menuItemModel");

const addMenuItem = async (req, res) => {
  const { id: restaurantId } = req.params;
  const { name, price, isAvailable } = req.body;
  if (!name || !price) return res.status(400).json({ error: "Missing fields" });

  try {
    const item = await menuModel.addMenuItem(
      restaurantId,
      name,
      price,
      isAvailable
    );
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add menu item" });
  }
};

const getMenuItems = async (req, res) => {
  const { id: restaurantId } = req.params;

  try {
    const items = await menuModel.getMenuItemsByRestaurant(restaurantId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

const editMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const updated = await menuModel.updateMenuItem(id, name, price);
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update item" });
  }
};

const removeMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    await menuModel.deleteMenuItem(id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
};

const toggleAvailability = async (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body;

  try {
    const updated = await menuModel.setAvailability(id, isAvailable);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update availability" });
  }
};

module.exports = {
  addMenuItem,
  getMenuItems,
  editMenuItem,
  removeMenuItem,
  toggleAvailability,
};
