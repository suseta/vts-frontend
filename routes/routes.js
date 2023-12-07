const express = require('express');
const router = express.Router();

const {index,addDriver} =require("../controllers/controllerFunction")
router.route("/").get(index);

// router.route("/addVehicle").post(addVehicle);
// router.route("/vehicleDetail").post(vehicleDetail);
router.route("/addDriver").post(addDriver);
// router.route("/DriverDetail").post(driverDetail);


module.exports = router;
