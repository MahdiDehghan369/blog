const yup = require("yup");

const checkIdSchema = yup.object().shape({
  id: yup
    .number()
    .integer("ID must be an integer")
    .positive("ID must be a positive number")
    .required("ID is required"),
});

module.exports = checkIdSchema;
