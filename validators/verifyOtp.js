const yup = require("yup");

const verifyOtpSchema = yup.object().shape({
  otpCode: yup
    .string()
    .length(6, "OTP code must be exactly 6 digits long")
    .matches(/^\d{6}$/, "OTP code must contain only digits"),
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
});

module.exports = verifyOtpSchema;
