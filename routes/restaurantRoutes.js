const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/", restaurantController.getRestaurants);
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.editRestaurant);
router.delete("/:id", restaurantController.removeRestaurant);

module.exports = router;
