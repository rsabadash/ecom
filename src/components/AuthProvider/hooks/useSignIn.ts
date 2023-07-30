import { useCallback } from 'react';

import { signInApi } from '../api';
import { SignInData, SignInResponse, Tokens } from '../types';

type UseSignInReturn = {
  signIn: (data: SignInData) => Promise<SignInResponse | undefined>;
};

export const useSignIn = (): UseSignInReturn => {
  const signIn = useCallback(
    async (data: SignInData): Promise<Tokens | undefined> => {
      return await signInApi(data);
    },
    [],
  );

  return {
    signIn,
  };
};
