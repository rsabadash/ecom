import {
  ApiService,
  LocalStorageService,
  SessionStorageService,
} from '../services';
import { API_HOST } from '../common/constants/api';
import {
  DEFAULT_LANGUAGE,
  Language,
  LOCALE_STORAGE_KEY,
} from '../components/IntlProvider';
import {
  ACCESS_TOKEN_KEY,
  PERSIST_USER_KEY,
} from '../components/AuthProvider/constants';
import { refreshTokenApi } from '../components/AuthProvider/api';
import { messages } from '../common/constants/errors';
import { sharedBus } from './sharedBus';
import { PERSIST_STATE } from '../components/AuthProvider/enums';

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
      if (error.message.toLowerCase() === messages.jwt.expired) {
        await refreshTokenApi();
        return true;
      }

      return false;
    },
    onGlobalError: (error): void => {
      if (error.message.toLowerCase() === messages.jwt.malformed) {
        return sharedBus.methods.signOut();
      }

      if (error.message.toLowerCase() === messages.access.forbidden) {
        return sharedBus.methods.signedInRedirect();
      }
    },
  };
});

const { GET, POST, PATCH, DELETE } = apiService;

export { GET, POST, PATCH, DELETE };
