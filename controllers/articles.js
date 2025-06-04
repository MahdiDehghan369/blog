const Article = require("./../repositories/articles");
const sharp = require('sharp');
const path = require('path');
const calculateTime = require('./../utils/funcs');
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const fs = require('fs');


exports.createArticle = async (req, res, next) => {
  try {
    let { title, content, slug, tags, status, summary } = req.body;

    slug = slug.trim().replace(/\s+/g, "-").toLowerCase();
    const author_id = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required.",
      });
    }

    const fileBuffer = req.file.buffer;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const cover = `${Date.now()}${ext}`;
    const coverPath = `/images/article_cover/${cover}`;
    const outputPath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "article_cover",
      cover
    );

    try {
      if (ext === ".png") {
        await sharp(fileBuffer).png({ quality: 60 }).toFile(outputPath);
      } else if (ext === ".jpeg" || ext === ".jpg") {
        await sharp(fileBuffer).jpeg({ quality: 60 }).toFile(outputPath);
      } else if (ext === ".webp") {
        await sharp(fileBuffer).webp({ quality: 60 }).toFile(outputPath);
      } else {
        return res.status(422).json({
          success: false,
          message:
            "Unsupported file format. Only JPEG, PNG, and WEBP are allowed.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Image compression failed.",
        error: err.message,
      });
    }

    const article = await Article.createArticle({
      title,
      content,
      slug,
      author_id,
      status,
      cover, 
      summary,
    });


    if (Array.isArray(tags)) {
      for (const tag of tags) {
        await Article.addTagToArticle(article.id, Number(tag));
      }
    }

    return res.status(201).json({
      success: true,
      message: "Article created successfully 🙂",
      article,
    });
  } catch (error) {
    if (error.status === 409) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred.",
      error: error.message,
    });

    next(error)
  }
};
exports.getAllArticles = async (req, res, next) => {
  try {

    const articles = await Article.getAllArticles()

    if(!articles){
      return res.status(404).json({
        message: "There is no article :)"
      })
    }

    for (const article of articles) {
      article.created_at = calculateTime(article.created_at)
    }

    return res.status(201).json(articles)

  } catch (error) {
    next(error);
  }
};


exports.removeArticle = async (req, res, next) => {
  try {
    const { id } = req.body;

    const article = await Article.getArticleInfoById(id);

    if (!article || !article[0]) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    const cover = article[0].cover;

    if (cover) {
      const coverPath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        "article_cover",
        cover
      );

      try {
        await fs.promises.unlink(coverPath);
      } catch (err) {
        if (err.code !== "ENOENT") throw err;
      }
    }

    const result = await Article.removeArticle(id);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Article not found or could not be deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Article has been successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};


exports.getPopularArticles = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.getArticlesOfAuthor = async (req, res, next) => {
  try {

    const authorId = req.user.id

    const articles = await Article.getArticlesOfAuthor(authorId);

    if (!articles || articles.length === 0) {
      return res.status(404).json({
        message: "No articles found for the specified author.",
      });
    }

    for (const article of articles) {
      article.created_at = calculateTime(article.created_at)
      article.updated_at = calculateTime(article.updated_at)
    }

    return res.status(200).json({
      message: "Articles retrieved successfully.",
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPublishedArticlesOfAuthor = async (req, res, next) => {
  try {
    const authorId = req.user.id;

    const articles = await Article.getPublishedArticlesOfAuthor(authorId);

    if (!articles || articles.length === 0) {
      return res.status(404).json({
        message: "No articles found for the specified author.",
      });
    }

    for (const article of articles) {
      article.created_at = calculateTime(article.created_at);
      article.updated_at = calculateTime(article.updated_at);
    }

    return res.status(200).json({
      message: "Articles retrieved successfully.",
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDraftedArticlesOfAuthor = async (req, res, next) => {
  try {

    const authorId = req.user.id;

    const articles = await Article.getDraftedArticlesOfAuthor(authorId);

    if (!articles || articles.length === 0) {
      return res.status(404).json({
        message: "No articles found for the specified author.",
      });
    }

    for (const article of articles) {
      article.created_at = calculateTime(article.created_at);
      article.updated_at = calculateTime(article.updated_at);
    }

    return res.status(200).json({
      message: "Articles retrieved successfully.",
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

exports.getArticleInfoBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const [article] = await Article.getArticleInfoBySlug(slug);

    if (!article) {
      return res.status(404).json({
        message: "Article not found with the given slug.",
      });
    }


    if (article) {
      article.created_at = calculateTime(article.created_at);
      article.updated_at = calculateTime(article.updated_at);
    }

    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};