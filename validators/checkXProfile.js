const yup = require("yup");

const checkXProfileSchema = yup.object().shape({
  x_profile: yup
    .string()
    .matches(/^[a-zA-Z0-9_]{1,15}$/, "Invalid X (Twitter) username.")
    .required("X profile is required."),
});

module.exports = checkXProfileSchema;
