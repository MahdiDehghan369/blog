const yup = require('yup');

const checkEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Email format is invalid"),
});

module.exports = checkEmailSchema;
