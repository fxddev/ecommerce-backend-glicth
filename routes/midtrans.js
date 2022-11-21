const express = require("express");
const controller = require('../controllers/midtrans');

const router = express.Router();

router.post("/midtrans/bayar", controller.bayar);
router.post("/midtrans/status", controller.status);
// router.post("/midtrans/statusb2b", controller.statusb2b);
// router.post("/midtrans/notifikasi", controller.notifikasi);
// router.post("/midtrans/expire", controller.expire);
router.post("/midtrans/cancel", controller.cancel);

module.exports = router;