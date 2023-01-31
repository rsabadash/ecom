import { ApiService, LocalStorageService } from '../services';
import { API_HOST } from '../common/constants/api';
import {
  DEFAULT_LANGUAGE,
  Language,
  LOCALE_STORAGE_KEY,
} from '../components/IntlProvider';
import { ACCESS_TOKEN_KEY } from '../components/AuthProvider/constants';
import { refreshTokenApi } from '../components/AuthProvider/api';
import { messages } from '../common/constants/errors';
import { sharedBus } from './sharedBus';

const apiService = new ApiService(API_HOST);

apiService.setGlobalOptions(() => ({
  headers: {
    'Accept-Language':
      LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY) ||
      DEFAULT_LANGUAGE,
    Authorization: `Bearer ${LocalStorageService.getItem(ACCESS_TOKEN_KEY)}`,
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
}));

const { GET, POST, PATCH, DELETE } = apiService;

export { GET, POST, PATCH, DELETE };
