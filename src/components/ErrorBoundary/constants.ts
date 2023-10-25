import { ErrorBoundaryState } from './types';

export const INITIAL_STATE: ErrorBoundaryState = {
  hasError: false,
  error: null,
  errorStatus: null,
};
