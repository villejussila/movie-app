const express = require("express");
const movieSearch = require("./movieSearch");
const movieInfo = require("./movieInfo");

const router = express.Router();

router.use("/search", movieSearch);
router.use("/info", movieInfo);

module.exports = router;
