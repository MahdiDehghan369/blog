const Article = require("./../repositories/articles");
const slugify = require("slugify");
const sharp = require('sharp');
const path = require('path');
const calculateTime = require('./../utils/funcs');
const summarize = require('./../utils/summarize');
const db = require("../db");


exports.createArticle = async (req, res, next) => {
  try {
    let { title, content, slug, meta_title, meta_description , tags } = req.body;


    const forbiddenChars =
      /^[a-z0-9\u0600-\u06FF ]+(?:-[a-z0-9\u0600-\u06FF ]+)*$/;

    if (!forbiddenChars.test(slug)) {
      return res.status(409).json({
        message:
          "Slug can only include letters (a-z, Persian), numbers (0-9), spaces, and hyphens (-).",
      });
    }

    slug = slug.trim().replace(/\s+/g, '-').toLowerCase();


    const author_id = req.user.id;

    const fileBuffer = req.file.buffer
    const coverPath = `/images/article_cover/${Date.now()}${path.extname(req.file.originalname)}`;
    const outputPath = path.join(__dirname, "..", "public", coverPath);


    try {
      if (ext === ".png") {
        await sharp(fileBuffer).png({ quality: 60 }).toFile(outputPath);
      } else if (ext === ".jpeg" || ext === ".jpg") {
        await sharp(fileBuffer).jpeg({ quality: 60 }).toFile(outputPath);
      } else if (ext === ".webp") {
        await sharp(fileBuffer).webp({ quality: 60 }).toFile(outputPath);
      } else {
        return res.status(422).json({
          message:
            "Unsupported file format. Only JPEG, PNG, and WEBP are allowed.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Image compression failed.",
        error: err.message,
      });
    }

    const article = await Article.createArticle({
      title,
      content,
      slug,
      author_id,
      meta_title,
      meta_description,
      cover: coverPath
    });


    for (const tag of tags) {
      await Article.addTagToArticle(article.id, Number(tag));
    }

    return res.status(201).json({
      message: "Article Created Successfully :)",
      article,
    });
  } catch (error) {
    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }
    return next(error);
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

    for (const article of articles) {
      article.summery = await summarize(article.content , 200)
    }

    return res.status(201).json(articles)

  } catch (error) {
    next(error);
  }
};

exports.removeArticle = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.getOneArticleBySlug = async (req, res, next) => {
  try {
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
