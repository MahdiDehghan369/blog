const yup = require("yup");

const checkUsernameSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(255)
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, "username is not valid !!")
    .required("username is required"),
});

module.exports = checkUsernameSchema;
