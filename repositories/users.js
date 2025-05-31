const db = require("../db");

const createUser = async ({ name, username, email, password }) => {
  const insertedUserQuery =
    "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";

  const [insertedUser] = await db.query(insertedUserQuery, [
    name,
    username,
    email,
    password,
  ]);

  const selectInsertedUserQuery = "SELECT * FROM users WHERE id = ?";
  const [user] = await db.query(selectInsertedUserQuery, [
    insertedUser.insertId,
  ]);


  return user[0];
};




const findByUsername = async ({username}) => {
const query =
    "SELECT * FROM users WHERE username = ?";

  const [user] = await db.query(query, [username]);

  return user[0];
};



const findById = async ({ id }) => {
  const query = "SELECT * FROM users WHERE id = ?";

  const [user] = await db.query(query, [id]);

  return user[0];
};


const findByUsernameAndEmail = async ({ username , email}) => {
  const query = "SELECT * FROM users WHERE username = ? OR email = ?";

  const [user] = await db.query(query, [username , email]);

  return user[0];
};

module.exports = {
  createUser,
  findById,
  findByUsername,
  findByUsernameAndEmail,
};