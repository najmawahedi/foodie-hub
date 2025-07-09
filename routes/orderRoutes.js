const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.post("/orders", controller.placeOrder);
router.get("/orders", controller.getOrders);
router.get("/customers/:id/orders", controller.getOrdersForCustomer);
router.patch("/orders/:id/status", controller.changeOrderStatus);
router.delete("/orders/:id", controller.cancelOrder);

module.exports = router;
