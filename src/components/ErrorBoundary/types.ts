import { PropsWithChildren, ReactNode } from 'react';

export type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: ReactNode;
  resetKey?: string;
}>;

export type ErrorBoundaryState = {
  hasError: boolean;
  errorStatus: number | null;
  error: string | null;
};
