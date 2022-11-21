const express = require("express");
const controller = require('../controllers/keranjang');

const router = express.Router();

router.post("/keranjang", controller.keranjang);
router.post("/keranjang/tambah", controller.tambahKeranjang);
router.put("/keranjang/update", controller.updateKeranjang);
router.post("/keranjang/deletes", controller.deletesKeranjang);
// router.post("/midtrans/status", controller.status);
// router.post("/midtrans/statusb2b", controller.statusb2b);
// router.post("/midtrans/notifikasi", controller.notifikasi);
// router.post("/midtrans/expire", controller.expire);
// router.post("/midtrans/cancel", controller.cancel);

module.exports = router;