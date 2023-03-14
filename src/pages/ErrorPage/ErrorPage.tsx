import { useRouteError } from 'react-router-dom';
import { useTranslation } from '../../components/IntlProvider';
import { Foreground } from '../../layouts/Foreground';
import { ApiError } from '../../services/apiService';
import classes from './styles/index.module.css';

const ErrorPage = () => {
  const { translate } = useTranslation();
  const error = useRouteError() as ApiError;

  if (error && error.status === 404) {
    return (
      <Foreground foregroundClassName={classes.errorPage}>
        <h1 className={classes.errorPageStatus}>{error.status}</h1>
        <h2 className={classes.errorPageMessage}>{translate('error.404')}</h2>
        <p>{error.message}</p>
      </Foreground>
    );
  }

  if (error && error.status === 500) {
    return (
      <Foreground>
        <h1>{error.status}</h1>
        <h2>{translate('error.505')}</h2>
        <p>{error.message}</p>
      </Foreground>
    );
  }

  return <Foreground>{translate('error.unknown')}</Foreground>;
};

export default ErrorPage;
