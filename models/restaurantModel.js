const pool = require("../db");

const getAllRestaurants = async () => {
  const result = await pool.query("SELECT * FROM restaurants ORDER BY id");
  return result.rows;
};

const addRestaurant = async (name, address) => {
  const result = await pool.query(
    "INSERT INTO restaurants (name, address) VALUES ($1, $2) RETURNING *",
    [name, address]
  );
  return result.rows[0];
};

const updateRestaurant = async (id, name, address) => {
  const result = await pool.query(
    "UPDATE restaurants SET name = $1, address = $2 WHERE id = $3 RETURNING *",
    [name, address, id]
  );
  return result.rows[0];
};

const deleteRestaurant = async (id) => {
  await pool.query("DELETE FROM restaurants WHERE id = $1", [id]);
};

module.exports = {
  getAllRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
