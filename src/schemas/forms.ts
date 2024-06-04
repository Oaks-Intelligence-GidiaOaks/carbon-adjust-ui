import * as yup from "yup";

export const FormSchemas = () => {
  return {
    RegisterSchema: yup.object().shape({
      name: yup.string().required("Your full name is required"),
      email: yup.string().email().required("Please enter a valid email"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords don't match")
        .required("Password confirmation is required"),
      accountType: yup
        .object()
        .shape({
          id: yup.number(),
          label: yup.string(),
          value: yup.string(),
        })
        .required("Please select account type"),
      // aggregatorType: yup.string().when("accountType.value", {
      //   is: "AGGREGATOR", // Condition: Type is 'AGGREGATOR'
      //   then: yup
      //     .object()
      //     .required(
      //       "Aggregator field is required when Account type is Aggregator"
      //     ),
      //   // You can add other validations for this field
      // }),
    }),
    LoginSchema: yup.object().shape({
      email: yup.string().email().required("Please enter a valid email"),
      password: yup.string().required("Please enter your password"),
    }),
  };
};
