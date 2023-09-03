import { endpoints } from '../../common/constants/api';
import {
  LocalStorageService,
  SessionStorageService,
} from '../../common/services';
import { POST } from '../../common/utils/api';
import { sharedBus } from '../../common/utils/sharedBus';
import {
  ACCESS_TOKEN_KEY,
  PERSIST_USER_KEY,
  REFRESH_TOKEN_KEY,
} from './constants';
import { PERSIST_STATE } from './enums';
import {
  RefreshTokenData,
  RefreshTokenResponse,
  SignInData,
  SignInResponse,
} from './types';

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
  const isPersistUser =
    LocalStorageService.getItem(PERSIST_USER_KEY) === PERSIST_STATE.EXIST;

  const refresh = isPersistUser
    ? LocalStorageService.getItem<string>(REFRESH_TOKEN_KEY)
    : SessionStorageService.getItem<string>(REFRESH_TOKEN_KEY);

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

    if (accessToken) {
      if (isPersistUser) {
        LocalStorageService.setItem(ACCESS_TOKEN_KEY, accessToken);
      } else {
        SessionStorageService.setItem(ACCESS_TOKEN_KEY, accessToken);
      }
    }

    if (refreshToken) {
      if (isPersistUser) {
        LocalStorageService.setItem(REFRESH_TOKEN_KEY, refreshToken);
      } else {
        SessionStorageService.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
    }
  }
};
