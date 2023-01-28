import { SignInFormValues } from '../types';
import { useCallback } from 'react';
import { useAuth } from '../../../components/AuthProvider';

type UseSignInFormSubmit = () => {
  handleFormSubmit: (values: SignInFormValues) => Promise<void>;
};

export const useSignInFormSubmit: UseSignInFormSubmit = () => {
  const { signIn } = useAuth();

  const handleFormSubmit = useCallback(
    async (values: SignInFormValues) => {
      return await signIn(values);
    },
    [signIn],
  );

  return {
    handleFormSubmit,
  };
};
