const yup = require('yup');

const createTagSchema = yup.object().shape({
  title: yup
    .string()
    .min(1, "Title cannot be empty")
    .max(50, "Title is too long")
    .required("Title of tag is required!"),
  slug: yup
    .string()
    .max(255)
    .matches(
      /^[a-z0-9\u0600-\u06FF ]+(?:-[a-z0-9\u0600-\u06FF ]+)*$/,
      "Slug can only include letters (a-z, Persian), numbers (0-9), spaces, and hyphens (-)."
    )
    .required("Slug is required!"),
});


module.exports = createTagSchema