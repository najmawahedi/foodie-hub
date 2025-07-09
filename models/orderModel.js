const pool = require("../db");

const createOrder = async (customerId, restaurantId, items) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const result = await client.query(
      "INSERT INTO orders (customer_id, restaurant_id, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [customerId, restaurantId, "pending"]
    );

    const orderId = result.rows[0].id;

    for (const item of items) {
      await client.query(
        "INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.menu_item_id, item.quantity]
      );
    }

    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const getAllOrders = async () => {
  const result = await pool.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  return result.rows;
};

const getOrdersByCustomer = async (customerId) => {
  const result = await pool.query(
    "SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC",
    [customerId]
  );
  return result.rows;
};

const updateOrderStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

const deleteOrder = async (id) => {
  await pool.query("DELETE FROM order_items WHERE order_id = $1", [id]); 
  await pool.query("DELETE FROM orders WHERE id = $1", [id]);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
  updateOrderStatus,
  deleteOrder,
};
