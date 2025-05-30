const express = require('express');
const controller = require('../controllers/tags');
const router = new express.Router()

const authGuard = require('./../middlewares/authGuard');
const roleGuard = require('./../middlewares/roleGuard');


router
  .route("/")
  .post(authGuard,roleGuard("admin" || "author") , controller.createTag)
  .get(authGuard, controller.getAlltags)
  .delete(authGuard ,roleGuard("admin" || "author")  ,controller.removeTag)
  .patch(authGuard ,roleGuard("admin" || "author")  , controller.updateTag)

router.route("/:tagSlug").get(controller.findArticlesByTags);

module.exports = router