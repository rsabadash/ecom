export type SignInFormValues = {
  email: string;
  password: string;
  rememberUser: boolean;
};

export type SignInFormFields = Record<
  keyof SignInFormValues,
  keyof SignInFormValues
>;
