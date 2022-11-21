const express = require("express");
const controller = require('../controllers/pesanan');

const router = express.Router();

router.post("/pesanan/create-invoice", controller.createInv);
router.post("/pesanan/create", controller.create);
router.post("/pesanan", controller.gets);
router.post("/pesanan/update", controller.update);

module.exports = router;