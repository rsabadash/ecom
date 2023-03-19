import { Component, PropsWithChildren } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import PageNotFound from '../../pages/ErrorPage/PageNotFound';
//import { Simulate } from 'react-dom/test-utils';
//import error = Simulate.error;

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
      error: '',
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ errorStatus: error.status, error: error.error });
    console.log(error);
    console.log(errorInfo);
    //   logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const showPageNotFound =
        this.state.errorStatus &&
        this.state.errorStatus === 404 &&
        this.state.error === 'Entity not found';

      if (showPageNotFound) {
        return <PageNotFound />;
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}
