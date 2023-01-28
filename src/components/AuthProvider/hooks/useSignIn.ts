import { useCallback } from 'react';
import { SignInData, SignInResponse } from '../types';
import { signInApi } from '../api';

type UseSignIn = () => {
  signIn: (data: SignInData) => Promise<SignInResponse | undefined>;
};

export const useSignIn: UseSignIn = () => {
  const signIn = useCallback(async (data: SignInData) => {
    return await signInApi(data);
  }, []);

  return {
    signIn,
  };
};
