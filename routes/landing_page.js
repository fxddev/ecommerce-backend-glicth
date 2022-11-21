const express = require("express");
const landingPageController = require('../controllers/landing_page');

const router = express.Router();

router.get("/", landingPageController.landingPage);

module.exports = router;