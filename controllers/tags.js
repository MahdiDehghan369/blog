const Tag = require("../repositories/tags");
const calculateRelativeTimeDifference = require('./../utils/funcs');
const summarize = require('./../utils/summarize');

exports.createTag = async (req, res, next) => {
  try {
    let { title, slug } = req.body;

    const forbiddenChars =
      /^[a-z0-9\u0600-\u06FF ]+(?:-[a-z0-9\u0600-\u06FF ]+)*$/;

    if (!forbiddenChars.test(slug)) {
      return res.status(409).json({
        message:
          "The slug can only contain letters (a-z, Persian), numbers (0-9), spaces, and hyphens (-).",
      });
    }

    slug = slug.trim().replace(/\s+/g, "-").toLowerCase();

    const newTag = await Tag.createTag(title, slug);

    return res.status(201).json({
      message: "Tag created successfully.",
      tag: newTag,
    });
  } catch (error) {
    if (error.status === 409) {
      return res.status(409).json({
        message: error.message || "A tag with this slug already exists.",
      });
    }

    return next(error);
  }
};



exports.getAlltags = async (req, res, next) => {
  try {
    const tags = await Tag.getAllTags();

    return res.status(200).json({
      tags,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeTag = async (req, res, next) => {
  try {
    const { id } = req.body;

    const removedTag = await Tag.removeTag(id);

    if (!removedTag) {
      return res.status(404).json({
        message: "Tag with the specified ID was not found.",
      });
    }

    return res.status(200).json({
      message: "Tag removed successfully.",
    });
  } catch (error) {
    next(error);
  }
};



exports.updateTag = async (req, res, next) => {
  try {
    const { id, title } = req.body;

    const isTagUpdated = await Tag.updateTag(id, title);

    if (!isTagUpdated) {
      return res.status(404).json({
        message: "Tag with the specified ID was not found.",
      });
    }

    return res.status(200).json({
      message: "Tag updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};


exports.findArticlesByTags = async (req, res, next) => {
  try {
    const tagSlug = req.params.tagSlug;

    const articles = await Tag.findArticlesByTags(tagSlug);

    if (articles.length === 0) {
      return res.status(404).json({
        message: "No articles found for the specified tag.",
      });
    }

    articles.forEach((article) => {
      article.created_at = calculateRelativeTimeDifference(article.created_at);
      article.summary = summarize(article.content, 200);
    });

    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

