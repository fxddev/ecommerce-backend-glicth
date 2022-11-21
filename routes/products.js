const express = require("express");
const controller = require('../controllers/products');

const router = express.Router();

router.get("/products", controller.products);
router.post("/product", controller.product);
router.post("/product/tambah", controller.tambah);
// router.post("/midtrans/status", controller.status);
// router.post("/midtrans/statusb2b", controller.statusb2b);
// router.post("/midtrans/notifikasi", controller.notifikasi);
// router.post("/midtrans/expire", controller.expire);
// router.post("/midtrans/cancel", controller.cancel);

module.exports = router;