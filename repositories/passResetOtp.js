const db = require("./../db");

const insertOtpCodeOnDb = async (email, otpCode, expiresAt) => {
  try {
    const query = `INSERT INTO password_reset_otps (email, otp_code, expires_at, is_used)
    VALUES (?, ?, ?, false)`;

    await db.query(query, [email, otpCode, expiresAt]);
  } catch (error) {
    throw error;
  }
};


const getOtpCodeByEmail = async (email) => {
  const query = `
    SELECT id ,otp_code, expires_at
    FROM password_reset_otps
    WHERE email = ? AND is_used = false AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `;

  const [rows] = await db.execute(query, [email]);
  return rows[0];
};


const markOtpAsUsed = async (id) => {
  const query = `UPDATE password_reset_otps SET is_used = true WHERE id = ?`;

  const [result] = await db.execute(query, [id]);

  if (result.affectedRows === 0) {
    throw new Error("No OTP found to mark as used.");
  }

  return true;
};

module.exports = {
  insertOtpCodeOnDb,
  getOtpCodeByEmail,
  markOtpAsUsed,
};
