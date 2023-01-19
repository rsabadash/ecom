import { ReactNode } from 'react';

export type ErrorBoundaryProps = {
  fallback?: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
