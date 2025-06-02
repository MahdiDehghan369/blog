const yup = require("yup");

const checkBirthdaySchema = yup.object().shape({
  birthday: yup
    .date()
    .max(new Date(), "Birthday cannot be in the future.")
    .min(new Date("1900-01-01"), "Birthday is unrealistically old.")
    .required("Birthday is required."),
});

module.exports = checkBirthdaySchema;
