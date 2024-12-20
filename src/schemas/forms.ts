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
      phoneNos: yup.string().trim().required("Please enter your phone number"),
      country: yup
        .object()
        .shape({
          label: yup.string().trim(),
          value: yup.string().trim().required("country value is required"),
        })
        .required("Please select a country"),
    }),
    LoginSchema: yup.object().shape({
      email: yup.string().email().required("Please enter a valid email"),
      password: yup.string().required("Please enter your password"),
    }),
    LoginTestSchema: yup.object().shape({
      email: yup.string().email().required("Please enter a valid email"),
    }),
    ResetPasswordSchema: yup.object().shape({
      password: yup.string().required("Please enter your password"),
      confirmPassword: yup.string().required("Please confirm your password"),
    }),
    ForgotPasswordSchema: yup.object().shape({
      email: yup.string().email().required("Please enter a valid email"),
    }),
    CreateUnitSchema: yup.object().shape({
      name: yup.string().required("Please enter a name"),
      unitFunction: yup.string().required("Please enter the unit function"),
    }),
    CreateOrganisationStaff: yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),

      name: yup
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),

      jobTitle: yup.string().trim().required("Job title is required"),

      auThorizationLevel: yup
        .object()
        .shape({
          label: yup.string(),
          value: yup.string().required("please select an authorization level"),
        })
        .nullable()
        .required("Authorization level is required"),

      unit: yup
        .object()
        .shape({
          value: yup.string().required("please select a unit"),
          label: yup.string(),
        })
        .nullable()
        .required("Unit selection is required"),

      file: yup
        .mixed()
        .required("File is required")
        .test("fileSize", "File is too large", (value: any) => {
          // Check file size (e.g., max 5MB)
          return value && value[0]?.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Unsupported file type", (value: any) => {
          // Optional: Check file type
          const supportedTypes = ["image/jpeg", "image/png", "application/pdf"];
          return value && supportedTypes.includes(value[0]?.type);
        }),

      subUnit: yup
        .object()
        .shape({
          value: yup.string().required("please select a unit"),
          label: yup.string(),
        })
        .nullable(),
    }),
    CreateSubUnit: yup.object().shape({
      name: yup.string().trim().required("Please enter the sub unit name"),
      description: yup
        .string()
        .trim()
        .required("Please enter the sub unit function"),
      parentUnitId: yup.string().trim().required("Please provide the unit id"),
    }),
  };
};
