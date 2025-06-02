const yup = require("yup");

const updateTagSchema = yup.object().shape({
  id: yup
    .number()
    .integer("ID must be an integer")
    .positive("ID must be a positive number")
    .required("Tag ID is required"),
  title: yup
    .string()
    .trim()
    .min(1, "Title cannot be empty")
    .max(50, "Title is too long")
    .required("Title is required"),
});

module.exports = updateTagSchema;
