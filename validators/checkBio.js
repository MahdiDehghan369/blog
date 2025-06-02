const yup = require("yup");

const checkBioSchema = yup.object().shape({
  bio: yup
    .string()
    .min(3, "Bio must be at least 3 characters.")
    .max(255, "Bio must be less than 255 characters.")
    .matches(/^[\p{L}\p{N}\p{P}\p{Zs}\p{Emoji}]*$/u, "Bio contains invalid characters.")
    .required("Bio is required."),
});

module.exports = checkBioSchema;