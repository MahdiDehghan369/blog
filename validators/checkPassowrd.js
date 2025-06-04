const yup = require("yup");

const checkPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must not exceed 255 characters")
    .required("Password is required"),
});

module.exports = checkPasswordSchema;
