const yup = require("yup");

const createArticleSchema = yup.object().shape({
  title: yup
    .string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long")
    .required("Title is required!"),
  content: yup.string().required("Content is required!"),
  slug: yup
    .string()
    .max(255)
    .matches(
      /^[a-z0-9\u0600-\u06FF ]+(?:-[a-z0-9\u0600-\u06FF ]+)*$/,
      "Slug can only include letters (a-z, Persian), numbers (0-9), spaces, and hyphens (-)."
    )
    .required("Slug is required!"),
  summary: yup.string().required("Summary is required!"),
  tags: yup
    .array()
    .of(
      yup
        .number()
        .integer("ID must be an integer")
        .positive("ID must be a positive number")
    )
    .optional(),
  status: yup.string().oneOf(["draft", "published"]).optional(),
});

module.exports = createArticleSchema;
