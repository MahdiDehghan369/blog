const yup = require("yup");

const checkGenderSchema = yup.object().shape({
  gender: yup
    .string()
    .oneOf(
      ["male", "female", "other"],
      "Gender must be 'male', 'female' or 'other'"
    )
    .required("Gender is required."),
});

module.exports = checkGenderSchema;
