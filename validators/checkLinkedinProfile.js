const yup = require("yup");

const checkLinkedinProfileSchema = yup.object().shape({
  linkedin_profile: yup
    .string()
    .matches(/^[a-zA-Z0-9-]{3,100}$/, "Invalid LinkedIn username.")
    .required("LinkedIn profile is required."),
});

module.exports = checkLinkedinProfileSchema;
