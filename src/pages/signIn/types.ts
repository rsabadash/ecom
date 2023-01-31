export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignInFormFields = Record<
  keyof SignInFormValues,
  keyof SignInFormValues
>;
