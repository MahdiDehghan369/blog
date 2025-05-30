const Article = require("./../repositories/articles");

exports.search = async (req, res, next) => {
  try {
    const searchValue = req.query.value?.trim();

    if (!searchValue) {
      return res.status(400).json({
        message: "Search value is required.",
      });
    }

    const articles = await Article.searchInArticles(searchValue);

    if(articles.length === 0){
        return res.status(404).json({
          message: "No articles found matching your search.",
        });

    }

    return res.status(201).json(articles);
  } catch (error) {
    next(error);
  }
};
