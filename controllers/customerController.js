const customerModel = require("../models/customerModel");

const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getAllCustomers();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get customers" });
  }
};

const createCustomer = async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  try {
    const customer = await customerModel.addCustomer(name, phone);
    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add customer" });
  }
};

const editCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  try {
    const updated = await customerModel.updateCustomer(id, name, phone);
    if (!updated) return res.status(404).json({ error: "Customer not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

const removeCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    await customerModel.deleteCustomer(id);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete customer" });
  }
};

module.exports = {
  getCustomers,
  createCustomer,
  editCustomer,
  removeCustomer,
};
