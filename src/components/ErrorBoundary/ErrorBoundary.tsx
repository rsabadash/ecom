import { Component, lazy, PropsWithChildren, Suspense } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import { messages } from '../../common/constants/errors';

const NotFound = lazy(() => import('../../pages/notFound/NotFound'));

// https://blog.openreplay.com/catching-errors-in-react-with-error-boundaries/
export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
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
    // eslint-disable-next-line no-debugger
    debugger;
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
