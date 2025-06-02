const yup = require("yup");

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .matches(
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
      "username is not valid !!"
    )
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).optional(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

module.exports = registerSchema;
