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
          "Slug can only include letters (a-z, Persian), numbers (0-9), spaces, and hyphens (-).",
      });
    }

    slug = slug.trim().replace(/\s+/g, "-").toLowerCase();

    const newTag = await Tag.createTag(title, slug);

    return res.status(201).json({
      message: "برچسب با موفقیت ایجاد شد",
      tag: newTag,
    });
  } catch (error) {
    if (error.status === 409) {
      return res.status(409).json({ message: error.message });
    }
    return next(error)
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

    const removeTag = await Tag.removeTag(id);

    if (!removeTag) {
      return res.status(404).json({
        message: "برچسب با این آیدی چیدا نشد ",
      });
    }

    return res.status(201).json({
      message: "برچسب با موفقیت حذف شد",
    });
  } catch (error) {
    next(error);
  }
};


exports.updateTag = async(req , res , next) => {
  try {
    
    const {id , title} = req.body

    const isTagUpdated = await Tag.updateTag(id , title)

    if(!isTagUpdated){
      return res.status(404).json({
        message: "آیدی برچسب چیدا نشد"
      })
    }

    return res.status(201).json({
      message: "برچسب با موفقیت بروزرسانی شد"
    })

  } catch (error) {
    next(error)
  }
}

exports.findArticlesByTags = async(req , res ,next) => {

  try {
    const tagSlug = req.params.tagSlug;

    const articles = await Tag.findArticlesByTags(tagSlug);

    if(articles.length === 0){
      return res.status(404).json({
        message: "مقاله ای یافت نشد",
      });
    }

    articles.forEach(article => {
      article.created_at = calculateRelativeTimeDifference(article.created_at)
    });

    articles.forEach((article) => {
      article.summery = summarize(article.content , 200)
    });

    return res.status(201).json(articles);



  } catch (error) {
    next(error)
  }


}
