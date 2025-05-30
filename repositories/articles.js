const { search } = require("../controllers/home");
const db = require("./../db");

const createArticle = async ({
  title,
  content,
  slug,
  author_id,
  meta_title,
  meta_description,
  cover,
}) => {
  try {
    const insertedArticleQuery = `
    INSERT INTO articles (title, content, slug, author_id, meta_title, meta_description , cover)
    VALUES (?, ?, ?, ?, ?, ? , ?)
  `;

    const [insertedArticle] = await db.query(insertedArticleQuery, [
      title,
      content,
      slug,
      author_id,
      meta_title,
      meta_description,
      cover,
    ]);
    const selectInsertedArticleQuery = "SELECT * FROM articles WHERE id = ?";
    const [article] = await db.query(selectInsertedArticleQuery, [
      insertedArticle.insertId,
    ]);

    return article[0];
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      let field = "value";

      if (error.sqlMessage.includes("slug")) {
        field = "slug";
      }

      const customError = new Error(
        `An article with this ${field} already exists.`
      );
      customError.status = 409;
      throw customError;
    }
  }
};

const addTagToArticle = async (articleId, tagId) => {
  try {
    const insertedTagQuery = "INSERT INTO articles_tags VALUES(? , ?)";
    const insertArticlesTags = await db.query(insertedTagQuery, [
      articleId,
      tagId,
    ]);
    return true;
  } catch (error) {
    return false;
  }
};

const removeArticle = async (articleId) => {
  try {
    const query = "DELETE FROM articles WHERE id = ?";

    const article = await db.query(query, [articleId]);
    return article.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

const searchInArticles = async (searchValue) => {
  try {
    const query = `SELECT 
  articles.id,
  articles.title,
  articles.slug,
  articles.meta_title,
  articles.meta_description,
  articles.created_at,
  users.name AS author_name,
  GROUP_CONCAT(DISTINCT tags.title SEPARATOR ', ') AS tag_titles
FROM articles
INNER JOIN articles_tags ON articles.id = articles_tags.article_id
INNER JOIN tags ON tags.id = articles_tags.tag_id
INNER JOIN users ON users.id = articles.author_id
WHERE 
  articles.title LIKE ? OR
  articles.content LIKE ? OR
  articles.meta_title LIKE ? OR
  articles.meta_description LIKE ? OR
  tags.title LIKE ?
GROUP BY 
  articles.id, articles.title, articles.slug, articles.meta_title, articles.meta_description, articles.created_at, users.name
ORDER BY 
  articles.created_at DESC;
`;

    const [articles] = await db.query(query, [
      `%${searchValue}%`,
      `%${searchValue}%`,
      `%${searchValue}%`,
      `%${searchValue}%`,
      `%${searchValue}%`,
    ]);

    return articles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createArticle,
  removeArticle,
  addTagToArticle,
  searchInArticles,
};
