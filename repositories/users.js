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

const setName = async (id, name) => {
  try {
    const query = `UPDATE users SET name = ? WHERE id = ?`;
    const [result] = await db.query(query, [name, id]);

    if (result.affectedRows === 0) {
      return { success: false, message: "User not found or name unchanged" };
    }

    const [userRows] = await db.query(
      `SELECT id, name FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

const setEmail = async (id, email) => {
  try {
    const query = `UPDATE users SET email = ? WHERE id = ?`;
    const [result] = await db.query(query, [email, id]);

    if (result.affectedRows === 0) {
      return { success: false, message: "User not found or email unchanged" };
    }

    const [userRows] = await db.query(
      `SELECT id, email FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

const setBio = async (id, bio) => {
  try {
    const query = `UPDATE users SET bio = ? WHERE id = ?`;
    const [result] = await db.query(query, [bio, id]);

    if (result.affectedRows === 0) {
      return { success: false, message: "User not found or bio unchanged" };
    }

    const [userRows] = await db.query(
      `SELECT id, bio FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};


module.exports = {
  createUser,
  findById,
  findByUsername,
  findByEmail,
  setName,
  setEmail,
  setBio,
};