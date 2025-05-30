const express = require("express");
const controller = require("../controllers/home");
const router = express.Router();


router.route('/search').get( controller.search)

module.exports = router;
 