import { refreshTokenApi } from '../../components/AuthProvider/api';
import {
  ACCESS_TOKEN_KEY,
  PERSIST_USER_KEY,
} from '../../components/AuthProvider/constants';
import { PERSIST_STATE } from '../../components/AuthProvider/enums';
import {
  DEFAULT_LANGUAGE,
  Language,
  LOCALE_STORAGE_KEY,
} from '../../components/IntlProvider';
import { API_HOST } from '../constants/api';
import { messages } from '../constants/errors';
import {
  ApiService,
  LocalStorageService,
  SessionStorageService,
} from '../services';
import { sharedBus } from './sharedBus';

const apiService = new ApiService(API_HOST);

apiService.setGlobalOptions(() => {
  const accessToken =
    LocalStorageService.getItem(PERSIST_USER_KEY) === PERSIST_STATE.EXIST
      ? LocalStorageService.getItem(ACCESS_TOKEN_KEY)
      : SessionStorageService.getItem(ACCESS_TOKEN_KEY);

  return {
    headers: {
      'Accept-Language':
        LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY) ||
        DEFAULT_LANGUAGE,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    retry: 1,
    onRetry: async (error): Promise<boolean> => {
      if (
        typeof error.message === 'string' &&
        error.message.toLowerCase() === messages.jwt.expired
      ) {
        await refreshTokenApi();
        return true;
      }

      return false;
    },
    onGlobalError: (error): void => {
      if (typeof error.message === 'string') {
        if (
          error.message.toLowerCase() === messages.jwt.malformed ||
          error.message.toLowerCase() === messages.jwt.expired
        ) {
          return sharedBus.methods.signOut();
        }

        if (error.message.toLowerCase() === messages.access.forbidden) {
          return sharedBus.methods.signedInRedirect();
        }
      }
    },
  };
});

const { GET, POST, PATCH, DELETE } = apiService;

export { DELETE, GET, PATCH, POST };
