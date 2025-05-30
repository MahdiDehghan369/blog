const db = require("../db");

const createTag = async (title, slug) => {
  try {
    const insertQuery = "INSERT INTO tags (title, slug) VALUES (?, ?)";
    const [result] = await db.query(insertQuery, [title, slug]);

    const [rows] = await db.query("SELECT * FROM tags WHERE id = ?", [
      result.insertId,
    ]);
    return rows[0];
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      let field = "مقدار";

      if (error.sqlMessage.includes("slug")) {
        field = "اسلاگ";
      } else if (error.sqlMessage.includes("title")) {
        field = "عنوان";
      }

      const customError = new Error(
        `برچسبی با این ${field} قبلاً ثبت شده است.`
      );
      customError.status = 409;
      throw customError;
    }

    throw error;
  }
};

const findByTitle = async (title) => {
  try {
    const query = "SELECT * FROM tags WHERE title = ?";

    const [tag] = await db.query(query, [title]);

    return tag[0];
  } catch (error) {
    throw error;
  }
};

const getAllTags = async () => {
  try {
    const query = "SELECT * FROM tags";

    const [tags] = await db.query(query);

    return tags;
  } catch (error) {
    throw error;
  }
};

const removeTag = async (id) => {
  try {
    const query = "DELETE FROM tags WHERE id = ?";

    const [tag] = await db.query(query, [id]);

    return tag.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

const updateTag = async (id, title) => {
  try {
    const query = "UPDATE tags SET title = ? WHERE id = ?";

    const [tag] = await db.query(query, [title, id]);

    return tag.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

const findArticlesByTags = async (slug) => {
  try {
    const query = `
      SELECT
    articles.title,
    articles.content,
    articles.slug,
    articles.meta_title,
    articles.meta_description,
    articles.created_at,
    users.name AS "Author Name",
    users.username AS "Author UserName",
    tags.title AS 'Tags Title'
FROM
    articles_tags
INNER JOIN articles ON articles.id = articles_tags.article_id
INNER JOIN tags ON articles_tags.tag_id = tags.id
INNER JOIN users ON articles.author_id = users.id
WHERE
    tags.slug = ?;`;
    const [articles] = await db.query(query, [slug]);

    return articles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTag,
  findByTitle,
  getAllTags,
  removeTag,
  updateTag,
  findArticlesByTags,
};
