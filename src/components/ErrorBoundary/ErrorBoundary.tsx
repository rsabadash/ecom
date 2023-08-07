import { Component, lazy, Suspense } from 'react';

import { messages } from '../../common/constants/errors';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

// https://blog.openreplay.com/catching-errors-in-react-with-error-boundaries/
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorStatus: null,
      error: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      errorStatus: error.status,
      error: error.error,
    };
  }

  get isEntityNotFound() {
    const { errorStatus, error } = this.state;

    return (
      errorStatus === 404 &&
      error &&
      error.toLowerCase() === messages.notFound.entity
    );
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
    console.log(errorInfo);
    //   logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.isEntityNotFound) {
        return (
          <Suspense>
            <NotFound />
          </Suspense>
        );
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}
