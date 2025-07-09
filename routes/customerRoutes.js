const express = require("express");
const router = express.Router();
const controller = require("../controllers/customerController");

router.get("/customers", controller.getCustomers);
router.post("/customers", controller.createCustomer);
router.put("/customers/:id", controller.editCustomer);
router.delete("/customers/:id", controller.removeCustomer);

module.exports = router;
