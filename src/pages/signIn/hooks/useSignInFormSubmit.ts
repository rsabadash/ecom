import { useCallback } from 'react';

import { useAuth } from '../../../components/AuthProvider';
import { SignInFormValues } from '../types';

type UseSignInFormSubmitReturn = {
  handleFormSubmit: (values: SignInFormValues) => Promise<void>;
};

export const useSignInFormSubmit = (): UseSignInFormSubmitReturn => {
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
