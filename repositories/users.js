const db = require("../db");

const createUser = async ({ username, email, password }) => {
  try {
    const insertedUserQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    const [insertedUser] = await db.query(insertedUserQuery, [
      username,
      email,
      password,
    ]);

    const selectInsertedUserQuery = "SELECT * FROM users WHERE id = ?";
    const [user] = await db.query(selectInsertedUserQuery, [
      insertedUser.insertId,
    ]);

    return user[0];
  } catch (error) {
    throw error;
  }
};

const findByUsername = async ({ username }) => {
  try {
    const query = "SELECT * FROM users WHERE username = ?";

    const [user] = await db.query(query, [username]);

    return user[0];
  } catch (error) {
    throw error;
  }
};

const findByEmail = async ({ email }) => {
  try {
    const query = "SELECT * FROM users WHERE email = ?";

    const [user] = await db.query(query, [email]);

    return user[0];
  } catch (error) {
    throw error;
  }
};

const findById = async ({ id }) => {
  try {
    const query = "SELECT * FROM users WHERE id = ?";

    const [user] = await db.query(query, [id]);

    return user[0];
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createUser,
  findById,
  findByUsername,
  findByEmail,
};