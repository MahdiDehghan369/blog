const yup = require("yup");

const checkSlugSchema = yup.object({
  slug: yup
    .string()
    .matches(
      /^[a-z0-9 ]+(?:-[a-z0-9 ]+)*$/,
      "Slug can only include letters (a-z, Persian), numbers (0-9), spaces, and hyphens (-)."
    )
    .required("Slug is required!"),
});

module.exports = checkSlugSchema;
