const yup = require("yup");

const removeTagSchema = yup.object().shape({
  id: yup
    .number()
    .integer("ID must be an integer")
    .positive("ID must be a positive number")
    .required("Tag ID is required"),
});

module.exports = removeTagSchema;
