const express = require("express");
const controller = require('../controllers/rating');

const router = express.Router();

router.post("/rating", controller.rating);
router.post("/rating/create", controller.create);

module.exports = router;