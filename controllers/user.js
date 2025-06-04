const User = require("./../repositories/users");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const image = (Date.now() * 369) + crypto.randomUUID() + ext
    const coverPath = `/images/profileUser/${image}`;
    const outputPath = path.join(__dirname, "..", "public", coverPath);

    try {
      if (ext === ".png") {
        await sharp(fileBuffer).png({ quality: 60 }).toFile(outputPath);
      } else if (ext === ".jpeg" || ext === ".jpg") {
        await sharp(fileBuffer).jpeg({ quality: 60 }).toFile(outputPath);
      } else if (ext === ".webp") {
        await sharp(fileBuffer).webp({ quality: 60 }).toFile(outputPath);
      } else {
        return res.status(422).json({
          message:
            "Unsupported file format. Only JPEG, PNG, and WEBP are allowed.",
        });
      }

      const userId = req.user.id
      const setProfile = await User.setProfileImage(userId , image)

      return res.status(200).json({
        message: "Profile image uploaded successfully",
        imagePath: coverPath,
        image
      });
    } catch (err) {
      return res.status(500).json({
        message: "Image compression failed",
        error: err.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.removeProfile = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    const image = user.avator; 

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No profile image set.",
      });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "profileUser",
      image
    );

    try {
      await fs.promises.unlink(imagePath); 
    } catch (err) {
      if (err.code === "ENOENT") {
        return res.status(404).json({
          success: false,
          message: "Profile image not found on server.",
        });
      }
      throw err;
    }

    await User.removeProfile(userId); 

    return res.status(200).json({
      success: true,
      message: "Profile image removed successfully 🙂",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove profile image.",
      error: err.message,
    });
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


