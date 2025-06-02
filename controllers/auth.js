const User = require("./../repositories/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const configs = require("../configs");

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

exports.checkEmail = async (req , res , next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required" });
    }

    const isEmailExists = await User.findByEmail({ email });

    if (isEmailExists) {
      return res.status(200).json({
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
}

exports.checkUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(422).json({ message: "Username is required" });
    }

    const isUsernameExists = await User.findByUsername({ username });

    if (isUsernameExists) {
      return res.status(200).json({
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
