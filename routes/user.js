const express = require("express");
const router = new express.Router();

const authGuard = require("./../middlewares/authGuard");
const controller = require("./../controllers/user");

const validateBody = require("./../middlewares/validateBody");
const emailValidator = require("./../validators/checkEmail");
const usernameValidator = require("./../validators/checkUsername");
const nameValidator = require("./../validators/checkName");
const bioValidator = require("./../validators/checkBio");

router
  .route("/set-name")
  .patch(authGuard, validateBody(nameValidator), controller.setName);
router
  .route("/set-email")
  .patch(authGuard, validateBody(emailValidator), controller.setEmail);
router.route("/set-bio").patch(authGuard, validateBody(bioValidator) , controller.setBio);
router.route("/set-profile").patch(authGuard, controller.setProfile);
router.route("/set-gender").patch(authGuard, controller.setGender);
router.route("/set-birthday").patch(authGuard, controller.setBirthday);
router.route("/set-x-profile").patch(authGuard, controller.setXProfile);
router
  .route("/set-linkedin-profile")
  .patch(authGuard, controller.setlinkedinProfile);
router
  .route("/set-username")
  .patch(authGuard, validateBody(usernameValidator), controller.setUsername);

module.exports = router;
