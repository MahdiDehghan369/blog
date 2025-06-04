const yup = require("yup");

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, "username is not valid !!")
    .required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

module.exports = loginSchema;