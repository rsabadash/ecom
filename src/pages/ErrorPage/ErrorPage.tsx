import { useRouteError } from 'react-router-dom';
import { useTranslation } from '../../components/IntlProvider';
import { SectionForeground } from '../../layouts/Section';
import { ApiError } from '../../services/apiService';
import classes from './styles/index.module.css';

const ErrorPage = () => {
  const { translate } = useTranslation();
  const error = useRouteError() as ApiError;

  if (error && error.status === 404) {
    return (
      <SectionForeground foregroundClassName={classes.errorPage}>
        <h1 className={classes.errorPageStatus}>{error.status}</h1>
        <h2 className={classes.errorPageMessage}>{translate('error.404')}</h2>
        <p>{error.message}</p>
      </SectionForeground>
    );
  }

  if (error && error.status === 500) {
    return (
      <SectionForeground>
        <h1>{error.status}</h1>
        <h2>{translate('error.505')}</h2>
        <p>{error.message}</p>
      </SectionForeground>
    );
  }

  return <SectionForeground>{translate('error.unknown')}</SectionForeground>;
};

export default ErrorPage;
