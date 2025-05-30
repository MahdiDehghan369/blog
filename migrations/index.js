  const fs = require("fs");
  const path = require("path");
  const db = require("../db");

  const migrate = async () => {

    const connection = await db.getConnection()

      const createUsersTable = fs.readFileSync(
        path.join(__dirname, "users_ddl.sql"),
        "utf8"
      );

      const createTagsTable = fs.readFileSync(
        path.join(__dirname, "tags_ddl.sql"),
        "utf8"
      );

      const createArticlesTable = fs.readFileSync(
        path.join(__dirname, "articles_ddl.sql"),
        "utf8"
      );

      const createArticlesTagsTable = fs.readFileSync(
        path.join(__dirname, "articles_tags_ddl.sql"),
        "utf8"
      );

      await connection.beginTransaction()
      try{
        await connection.query(createUsersTable);
        await connection.query(createTagsTable);
      await connection.query(createArticlesTable);
      await connection.query(createArticlesTagsTable);

      await connection.commit()
    } catch (error) {
      await connection.rollback()
    }
  };

  migrate().then(() => {
    console.log("Database ran successfully ✅");
  }).catch(() => {
    db.end()
  });
