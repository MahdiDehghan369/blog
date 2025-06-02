const Article = require("./../repositories/articles");
const sharp = require('sharp');
const path = require('path');
const calculateTime = require('./../utils/funcs');
const jwt = require("jsonwebtoken");
const configs = require("../configs");


exports.createArticle = async (req, res, next) => {
  try {
    let { title, content, slug, tags, status , summery } = req.body;

    slug = slug.trim().replace(/\s+/g, '-').toLowerCase();


    const author_id = req.user.id;

    // const fileBuffer = req.file.buffer
    // const coverPath = `/images/article_cover/${Date.now()}${path.extname(req.file.originalname)}`;
    // const outputPath = path.join(__dirname, "..", "public", coverPath);


    // try {
    //   if (ext === ".png") {
    //     await sharp(fileBuffer).png({ quality: 60 }).toFile(outputPath);
    //   } else if (ext === ".jpeg" || ext === ".jpg") {
    //     await sharp(fileBuffer).jpeg({ quality: 60 }).toFile(outputPath);
    //   } else if (ext === ".webp") {
    //     await sharp(fileBuffer).webp({ quality: 60 }).toFile(outputPath);
    //   } else {
    //     return res.status(422).json({
    //       message:
    //         "Unsupported file format. Only JPEG, PNG, and WEBP are allowed.",
    //     });
    //   }
    // } catch (err) {
    //   return res.status(500).json({
    //     message: "Image compression failed.",
    //     error: err.message,
    //   });
    // }

    const article = await Article.createArticle({
      title,
      content,
      summery,
      slug,
      author_id,
      status
      // cover: coverPath
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

    return res.status(201).json(articles)

  } catch (error) {
    next(error);
  }
};


exports.removeArticle = async (req, res, next) => {
  try {
    const { id } = req.body;

    const isArticleRemoved = await Article.removeArticle(id);

    if (!isArticleRemoved) {
      return res.status(404).json({
        message: "Article not found or could not be deleted.",
      });
    }

    return res.status(200).json({
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
    const accessToken = req.cookies?.accessToken;


    if(!accessToken){
      return res
        .status(401)
        .json({ message: "Authentication required. Please log in." });
    }

    const decodedToken = await jwt.verify(accessToken , configs.auth.accessTokenSecretKey)

    const authorId = decodedToken.id

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
    const accessToken = req.cookies?.accessToken;


    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Authentication required. Please log in." });
    }

    const decodedToken = await jwt.verify(
      accessToken,
      configs.auth.accessTokenSecretKey
    );


    const authorId = decodedToken.id;

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
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Authentication required. Please log in." });
    }

    const decodedToken = await jwt.verify(
      accessToken,
      configs.auth.accessTokenSecretKey
    );

    const authorId = decodedToken.id;

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