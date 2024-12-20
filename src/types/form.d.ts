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
  merchantType?: {
    id?: any;
    label: string;
    value: string;
  };
  country?: {
    id?: any;
    label: string;
    value: string;
  };
  phoneNos?: string;
};

export type LoginFormContext = {
  email: string;
  password: string;
};

export type LoginTestFormContext = {
  email: string;
};

export type ResetPasswordFormContext = {
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordFormContext = {
  email: string;
};
