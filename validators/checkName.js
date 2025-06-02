const yup = require("yup");

const checkNameSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(255, "Name must be less than 255 characters.")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces.")
    .required("Name is required."),
});

module.exports = checkNameSchema;
