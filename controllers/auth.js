const User = require("./../repositories/users");
const PassResetOtp = require("./../repositories/passResetOtp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("./../configs");
const sendOtpEmail = require("./../utils/sendOtpEmail");
const generateOtp = require("./../utils/generateOtp");
const { number } = require("yup");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      { expiresIn: `${configs.auth.accessTokenExpiresInSeonds}s` }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.refreshTokenSecretKey,
      { expiresIn: `${configs.auth.refreshTokenExpiresInSeonds}s` }
    );

    const refreshTokenHashed = bcrypt.hashSync(refreshToken, 10);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: configs.auth.accessTokenExpiresInSeonds * 1000,
    });

    res.cookie("refreshToken", refreshTokenHashed, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: configs.auth.refreshTokenExpiresInSeonds * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully.",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    const isEmailExists = await User.findByEmail({ email });

    if (isEmailExists) {
      return res.status(409).json({
        exists: true,
        message: "Email is already taken",
      });
    }

    return res.status(200).json({
      exists: false,
      message: "Email is available",
    });
  } catch (error) {
    next(error);
  }
};

exports.checkUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(422).json({ message: "Username is required" });
    }

    const isUsernameExists = await User.findByUsername({ username });

    if (isUsernameExists) {
      return res.status(409).json({
        exists: true,
        message: "Username is already taken",
      });
    }

    return res.status(200).json({
      exists: false,
      message: "Username is available",
    });
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res, next) => {};

exports.getMe = async (req, res, next) => {};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

exports.requestReset = async (req, res, next) => {
  try {
    const { email } = req.body;

    const otpCode = generateOtp();

    const isEmailExistsInDB = await User.findByEmail({email});

    if (!isEmailExistsInDB) {
      return res.status(201).json({
        message: "If this email is registered, an OTP has been sent.",
      });
    }

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await PassResetOtp.insertOtpCodeOnDb(email , otpCode , expiresAt)

    const sendEmail = await sendOtpEmail(email , otpCode);

    res.status(201).json({
      message: "If this email is registered, an OTP has been sent.",
    });

  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;

    const getOtpCodeFromDB = await PassResetOtp.getOtpCodeByEmail(email);

    if (!getOtpCodeFromDB) {
      return res.status(404).json({ message: "Invalid or expired OTP" });
    }

    if (getOtpCodeFromDB.is_used) {
      return res.status(409).json({ message: "OTP has already been used" });
    }

    if (new Date(getOtpCodeFromDB.expires_at) < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (getOtpCodeFromDB.otp_code !== otpCode) {
      return res.status(422).json({ message: "Incorrect OTP" });
    }

    await PassResetOtp.markOtpAsUsed(getOtpCodeFromDB.id);

    const token = jwt.sign(
      { email, purpose: "reset_password" },
      configs.resetPassword.resetPassowrdTokenSecretKey,
      {
        expiresIn: `${configs.resetPassword.resetPassowrdExpiresInSeconds}s`
      }
    );

    res.cookie("ResetPasswordToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: configs.resetPassword.resetPassowrdExpiresInSeconds * 1000,
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      token, 
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    const resetPasswordToken = req.cookies?.ResetPasswordToken;
    if (!resetPasswordToken) {
      return res.status(400).json({ message: "Reset token is missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(
        resetPasswordToken,
        configs.resetPassword.resetPassowrdTokenSecretKey
      );
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded.purpose !== "reset_password") {
      return res.status(403).json({ message: "Invalid token purpose" });
    }

    const email = decoded.email;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.setPassword(email, hashedPassword);

    res.clearCookie("ResetPasswordToken");

    return res.status(200).json({
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    next(error);
  }
};
