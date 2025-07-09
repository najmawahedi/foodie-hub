const pool = require("../db");

const addMenuItem = async (restaurantId, name, price, isAvailable = true) => {
  const result = await pool.query(
    "INSERT INTO menu_items (restaurant_id, name, price, is_available) VALUES ($1, $2, $3, $4) RETURNING *",
    [restaurantId, name, price, isAvailable]
  );
  return result.rows[0];
};

const getMenuItemsByRestaurant = async (restaurantId) => {
  const result = await pool.query(
    "SELECT * FROM menu_items WHERE restaurant_id = $1 ORDER BY id",
    [restaurantId]
  );
  return result.rows;
};

const updateMenuItem = async (id, name, price) => {
  const result = await pool.query(
    "UPDATE menu_items SET name = $1, price = $2 WHERE id = $3 RETURNING *",
    [name, price, id]
  );
  return result.rows[0];
};

const deleteMenuItem = async (id) => {
  await pool.query("DELETE FROM menu_items WHERE id = $1", [id]);
};

const setAvailability = async (id, isAvailable) => {
  const result = await pool.query(
    "UPDATE menu_items SET is_available = $1 WHERE id = $2 RETURNING *",
    [isAvailable, id]
  );
  return result.rows[0];
};

module.exports = {
  addMenuItem,
  getMenuItemsByRestaurant,
  updateMenuItem,
  deleteMenuItem,
  setAvailability,
};
