const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router()

const validate = require('./../middlewares/validate');
const registerValidator = require('./../validators/register');
const loginValidator = require('./../validators/login');


router.route("/register").post(validate(registerValidator) , controller.register)
router.route("/login").post(validate(loginValidator) , controller.login)
router.route("/refresh").post(controller.refresh)
router.route("/me").get(controller.getMe)
router.route("/logout").post(controller.logout);

router.route("/captcha").get(controller.getCaptcha);


module.exports = router