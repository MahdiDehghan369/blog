const User = require("./../repositories/users");

exports.setName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const user = await User.setName(userId, name);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.setEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userId = req.user.id;

    const user = await User.setEmail(userId, email);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.setBio = async (req, res, next) => {
  try {
    const { bio } = req.body;
    const userId = req.user.id;

    const user = await User.setBio(userId, bio);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.setProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.setGender = async (req, res, next) => {
  try {
    const { gender } = req.body;
    const userId = req.user.id;

    const user = await User.setGender(userId, gender);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.setBirthday = async (req, res, next) => {
  try {
    const { birthday } = req.body;
    const userId = req.user.id;

    const user = await User.setBirthday(userId, birthday);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.setXProfile = async (req, res, next) => {
  try {
    const { x_profile } = req.body;
    const userId = req.user.id;

    const user = await User.setXProfile(userId, x_profile);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.setlinkedinProfile = async (req, res, next) => {
  try {
    const { linkedin_profile } = req.body;
    const userId = req.user.id;

    const user = await User.setLinkedinProfile(userId, linkedin_profile);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.setUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const userId = req.user.id;

    const user = await User.setUsername(userId, username);

    if (!user.success) {
      return res.status(404).json({
        success: user.success,
        message: user.message,
      });
    }

    return res.status(201).json({
      success: user.success,
      user: user.user,
    });
  } catch (error) {
    next(error);
  }
};
