import { useTranslation } from '../../components/IntlProvider';
import { Heading } from '../../components/Heading';
import classes from './styles/index.module.css';

const NotFound = () => {
  const { translate } = useTranslation();

  return (
    <section className={classes.notFound}>
      <Heading level={1} classNameHeading={classes.notFound__status}>
        404
      </Heading>
      <Heading level={2} classNameHeading={classes.notFound__message}>
        {translate('error.404')}
      </Heading>
    </section>
  );
};

export default NotFound;
