const pool = require("../db");

const getAllCustomers = async () => {
  const result = await pool.query("SELECT * FROM customers ORDER BY id");
  return result.rows;
};

const addCustomer = async (name, phone) => {
  const result = await pool.query(
    "INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *",
    [name, phone]
  );
  return result.rows[0];
};

const updateCustomer = async (id, name, phone) => {
  const result = await pool.query(
    "UPDATE customers SET name = $1, phone = $2 WHERE id = $3 RETURNING *",
    [name, phone, id]
  );
  return result.rows[0];
};

const deleteCustomer = async (id) => {
  await pool.query("DELETE FROM customers WHERE id = $1", [id]);
};

module.exports = {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
