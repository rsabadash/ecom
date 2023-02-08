import {
  RefreshTokenData,
  RefreshTokenResponse,
  SignInData,
  SignInResponse,
} from './types';
import { POST } from '../../utils/api';
import { endpoints } from '../../common/constants/api';
import { LocalStorageService } from '../../services';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';
import { sharedBus } from '../../utils/sharedBus';

export const signInApi = async (
  data: SignInData,
): Promise<SignInResponse | undefined> => {
  return await POST<SignInResponse, SignInData>(
    endpoints.authentication.signIn,
    {
      data,
    },
  );
};

export const refreshTokenApi = async (): Promise<void> => {
  const refresh = LocalStorageService.getItem<string>(REFRESH_TOKEN_KEY);

  if (refresh) {
    const response = await POST<RefreshTokenResponse, RefreshTokenData>(
      endpoints.authentication.refreshToken,
      {
        data: {
          refreshToken: refresh,
        },
        retry: 0,
        onError: sharedBus.methods.signOut,
      },
    );

    const { accessToken, refreshToken } = response || {};

    if (accessToken && refreshToken) {
      LocalStorageService.setItem(ACCESS_TOKEN_KEY, accessToken);
      LocalStorageService.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }
};
