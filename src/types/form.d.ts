export type RegisterFormContext = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: {
    id?: any;
    label: string;
    value: string;
  };
  aggregatorType?: {
    id?: any;
    label: string;
    value: string;
  };
};
export type LoginFormContext = {
  email: string;
  password: string;
};
