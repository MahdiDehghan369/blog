const db = require("./../db");

const getTagsOfArticle = async (articles) => {
  const formattedArticles = [];

  if (Array.isArray(articles)) {
    for (const article of articles) {
      const [tags] = await db.query(
        `
        SELECT tags.id, tags.title, tags.slug FROM articles_tags
        INNER JOIN tags ON articles_tags.tag_id = tags.id
        WHERE articles_tags.article_id = ?`,
        [article.id]
      );

      formattedArticles.push({
        id: article.id,
        title: article.title,
        content: article.content,
        slug: article.slug,
        cover: article.cover,
        created_at: article.created_at,
        author: {
          name: article.Author_Name,
          username: article.Author_Username,
          profile: article.Author_Profile,
        },
        tags: tags.map((tag) => ({
          id: tag.id,
          title: tag.title,
          slug: tag.slug,
        })),
      });
    }

    return formattedArticles;
  }

  const [tags] = await db.query(
    `
    SELECT tags.id, tags.title, tags.slug FROM articles_tags
    INNER JOIN tags ON articles_tags.tag_id = tags.id
    WHERE articles_tags.article_id = ?`,
    [articles.id]
  );

  return {
    id: articles.id,
    title: articles.title,
    content: articles.content,
    slug: articles.slug,
    cover: articles.cover,
    created_at: articles.created_at,
    author: {
      name: articles.Author_Name,
      username: articles.Author_Username,
      profile: articles.Author_Profile,
    },
    tags: tags.map((tag) => ({
      id: tag.id,
      title: tag.title,
      slug: tag.slug,
    })),
  };
};

module.exports = getTagsOfArticle;
