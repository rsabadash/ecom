import { useTranslation } from '../../components/IntlProvider';
import { Foreground } from '../../layouts/Foreground';
import classes from './styles/index.module.css';

const PageNotFound = () => {
  const { translate } = useTranslation();

  return (
    <Foreground foregroundClassName={classes.errorPage}>
      <h1 className={classes.errorPageStatus}>404</h1>
      <h2 className={classes.errorPageMessage}>{translate('error.404')}</h2>
    </Foreground>
  );
};

export default PageNotFound;
