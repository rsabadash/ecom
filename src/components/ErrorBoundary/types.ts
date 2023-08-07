import { PropsWithChildren, ReactNode } from 'react';

export type ErrorBoundaryProps = PropsWithChildren<{
  fallback?: ReactNode;
}>;

export type ErrorBoundaryState = {
  hasError: boolean;
  errorStatus: number | null;
  error: string | null;
};
