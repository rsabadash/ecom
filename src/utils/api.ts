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

const apiService = new ApiService(API_HOST);

apiService.setConfig(() => ({
  headers: {
    'Accept-Language':
      LocalStorageService.getItem<Language>(LOCALE_STORAGE_KEY) ||
      DEFAULT_LANGUAGE,
    Authorization: `Bearer ${LocalStorageService.getItem(ACCESS_TOKEN_KEY)}`,
    'Content-Type': 'application/json',
  },
  retry: 1,
  onRetry: async (error) => {
    if (error.message.toLowerCase() === messages.jwt.expired) {
      await refreshTokenApi();
    }
  },
}));

const { GET, POST, PATCH, DELETE } = apiService;

export { GET, POST, PATCH, DELETE };
