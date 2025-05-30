const User = require("./../repositories/users");
const jwt = require("jsonwebtoken");
const svgCaptcha = require("svg-captcha");
const bcrypt = require("bcryptjs");
const configs = require("../configs");

exports.register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const userIsExists = await User.findByUsernameAndEmail({ username, email });

    if (userIsExists) {
      return res.status(422).json({
        message: "Username or email already exists :)",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.createUser({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "کاربر با موفقیت ثبت نام شد"
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
        message: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.accessTokenSecretKey,
      {
        expiresIn: configs.auth.accessTokenExpiresInSeonds + "s",
      }
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      configs.auth.refreshTokenSecretKey,
      {
        expiresIn: configs.auth.refreshTokenExpiresInSeonds + "s",
      }
    );

    const refreshTokenHashed = bcrypt.hashSync(refreshToken, 10);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: configs.auth.accessTokenExpiresInSeonds * 1000
    });

    
    res.cookie("refreshToken", refreshTokenHashed, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: configs.auth.refreshTokenExpiresInSeonds * 1000,
    });
    

    return res.status(201).json({
      message: "کاربر با موفقیت لاگین شد"
    })

  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res, next) => {};

exports.getMe = async (req, res, next) => {};

exports.logout = async (req, res, next) => {};

exports.getCaptcha = async(req , res , next) => {
  try {
    const captcha = svgCaptcha.create({ size: 5, color: true, noise: 5 });

    return res.status(201).json({
      captcha,
    });
  } catch (error) {
    next(error)
  }

}