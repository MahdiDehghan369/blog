const express = require('express');
const controller = require('../controllers/tags');
const router = new express.Router()

const authGuard = require('./../middlewares/authGuard');
const roleGuard = require('./../middlewares/roleGuard');
const validateBody = require('../middlewares/validateBody');
const createTagValidator = require('./../validators/createTag');
const updateTagValidator = require('./../validators/updateTag');
const removeTagValidator = require("./../validators/removeTag");
const checkSlugValidator = require("./../validators/checkSlug");
const validateParams = require("../middlewares/validateParams");



router
  .route("/")
  .post(
    authGuard,
    roleGuard("admin" || "author"),
    validateBody(createTagValidator),
    controller.createTag
  )
  .get(authGuard, controller.getAlltags)
  .delete(
    authGuard,
    roleGuard("admin" || "author"),
    validateBody(removeTagValidator),
    controller.removeTag
  )
  .patch(
    authGuard,
    roleGuard("admin" || "author"),
    validateBody(updateTagValidator),
    controller.updateTag
  );

router.route("/:slug").get(validateParams(checkSlugValidator) , controller.findArticlesByTags);

module.exports = router