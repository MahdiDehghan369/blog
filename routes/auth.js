const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router()

const validateBody = require("./../middlewares/validateBody");
const registerValidator = require('./../validators/register');
const loginValidator = require('./../validators/login');
const checkUsernameValidator = require("./../validators/checkUsername");
const checkEmailValidator = require("./../validators/checkEmail");
const verifyOtpValidator = require("./../validators/verifyOtp");
const checkPassowrdValidator = require("./../validators/checkPassowrd");


router
  .route("/register")
  .post(validateBody(registerValidator), controller.register);
router.route("/login").post(validateBody(loginValidator) , controller.login)
router.route("/refresh").post(controller.refresh)
router.route("/me").get(controller.getMe)
router.route("/logout").post(controller.logout);
router
  .route("/check-username")
  .post(validateBody(checkUsernameValidator), controller.checkUsername);
router
  .route("/check-email")
  .post(validateBody(checkEmailValidator), controller.checkEmail);


router
  .route("/request-reset")
  .post(validateBody(checkEmailValidator), controller.requestReset);

router.route("/verify-otp").post(validateBody(verifyOtpValidator), controller.verifyOtp);
router
  .route("/reset-password")
  .post(validateBody(checkPassowrdValidator), controller.resetPassword);

module.exports = router