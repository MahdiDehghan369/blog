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

const findById = async (id) => {
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

const setGender = async (id, gender) => {
  try {
    const query = `UPDATE users SET gender = ? WHERE id = ?`;
    const [result] = await db.query(query, [gender, id]);

    if (result.affectedRows === 0) {
      return { success: false, message: "User not found or gender unchanged" };
    }

    const [userRows] = await db.query(
      `SELECT id, gender FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

const setBirthday = async (id, birthday) => {
  try {
    const query = `UPDATE users SET birthday = ? WHERE id = ?`;
    const [result] = await db.query(query, [birthday, id]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found or birthday unchanged",
      };
    }

    const [userRows] = await db.query(
      `SELECT id, birthday FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

const setXProfile = async (id, x_profile) => {
  try {
    const query = `UPDATE users SET x_profile = ? WHERE id = ?`;
    const [result] = await db.query(query, [x_profile, id]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found or x_profile unchanged",
      };
    }

    const [userRows] = await db.query(
      `SELECT id, x_profile FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

const setLinkedinProfile = async (id, linkedin_profile) => {
  try {
    const query = `UPDATE users SET linkedin_profile = ? WHERE id = ?`;
    const [result] = await db.query(query, [linkedin_profile, id]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found or linkedin profile unchanged",
      };
    }

    const [userRows] = await db.query(
      `SELECT id, linkedin_profile FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

const setUsername = async (id, username) => {
  try {
    const query = `UPDATE users SET username = ? WHERE id = ?`;
    const [result] = await db.query(query, [username, id]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found or username unchanged",
      };
    }

    const [userRows] = await db.query(
      `SELECT id, username FROM users WHERE id = ?`,
      [id]
    );

    return { success: true, user: userRows[0] };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

const setPassword = async (email , password) => {
  try {
    const query = `UPDATE users SET password = ? WHERE email = ?`;
    const [result] = await db.query(query, [password, email]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found or password unchanged",
      };
    }


    return { success: true, message: "passowrd changed successfully :)"};
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};


const setProfileImage = async (id, profile) => {
  try {
    const query = `UPDATE users SET avator = ? WHERE id = ?`;
    const [result] = await db.query(query, [profile, id]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found or profile unset",
      };
    }

    return { success: true, message: "profile set successfully :)" };
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};


const removeProfile = async (id) => {
  try {
    const query = `UPDATE users SET avator = NULL WHERE id = ?`;
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found or profile not remove",
      };
    }

    return { success: true, message: "Removed profile successfully :)" };
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
  setGender,
  setBirthday,
  setPassword,
  setXProfile,
  setLinkedinProfile,
  setUsername,
  setProfileImage,
  removeProfile,
};