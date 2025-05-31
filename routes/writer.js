const express = require("express");
const router = new express.Router();

const authGurad = require("../middlewares/authGuard");
const roleGuard = require("../middlewares/roleGuard");
const controller = require("../controllers/articles");
const authGuard = require("../middlewares/authGuard");

router
  .route("/articles")
  .get(
    authGurad,
    roleGuard("admin" || "author"),
    controller.getArticlesOfAuthor
  )
  .post(
    authGurad,
    roleGuard("admin" || "author"),
    controller.createArticle
  );


  router
    .route("/articles/:slug")
    .get(
      authGuard,
      roleGuard("admin" || "author"),
      controller.getArticleInfoBySlug
    );

module.exports = router;
