export type SignInFormValues = {
  email: string;
  password: string;
  isPersistUser: boolean;
};

export type SignInFormFields = Record<
  keyof SignInFormValues,
  keyof SignInFormValues
>;
