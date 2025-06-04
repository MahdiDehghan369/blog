const express = require('express');
const router = new express.Router()
const multer = require('multer');
const path = require('path');
const authGurad = require('../middlewares/authGuard');
const roleGuard = require("../middlewares/roleGuard");
const controller = require('../controllers/articles');

const validateBody = require("../middlewares/validateBody");
const validateParams = require("../middlewares/validateParams");
const createArticleValidator = require('./../validators/createArticle');
const checkSlugValidator = require("./../validators/checkSlug");
const checkIdValidator = require("./../validators/checkId");

const uploader = multer()


router
  .route("/")
  .post(
    authGurad,
    uploader.single("cover"),
    validateBody(createArticleValidator),
    controller.createArticle
  )
  .get(controller.getAllArticles)
  .delete(authGurad, validateBody(checkIdValidator), controller.removeArticle);

router.route('/published').get(authGurad , controller.getPublishedArticlesOfAuthor)
router.route('/drafted').get(authGurad , controller.getDraftedArticlesOfAuthor)

router
  .route("/:slug")
  .get(validateParams(checkSlugValidator), controller.getArticleInfoBySlug);

router.route("/popular").get(controller.getPopularArticles);




module.exports = router