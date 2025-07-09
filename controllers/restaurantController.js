const restaurantModel = require("../models/restaurantModel");

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel.getAllRestaurants();
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

const createRestaurant = async (req, res) => {
  const { name, address } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  try {
    const restaurant = await restaurantModel.addRestaurant(name, address);
    res.status(201).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
};

const editRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const updated = await restaurantModel.updateRestaurant(id, name, address);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update restaurant" });
  }
};

const removeRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    await restaurantModel.deleteRestaurant(id);
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete restaurant" });
  }
};

module.exports = {
  getRestaurants,
  createRestaurant,
  editRestaurant,
  removeRestaurant,
};
