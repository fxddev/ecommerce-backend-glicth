const express = require("express");
const controller = require('../controllers/ongkir');

const router = express.Router();

router.post("/rajaongkir/city", controller.city);
router.post("/rajaongkir/cost", controller.cost);

module.exports = router;