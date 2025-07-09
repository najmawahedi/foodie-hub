const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuItemController");


router.post("/restaurants/:id/menu-items", controller.addMenuItem);
router.get("/restaurants/:id/menu-items", controller.getMenuItems);


router.put("/menu-items/:id", controller.editMenuItem);
router.delete("/menu-items/:id", controller.removeMenuItem);
router.patch("/menu-items/:id/availability", controller.toggleAvailability);

module.exports = router;
