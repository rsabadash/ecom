import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { ForegroundSection } from '../../components/Foreground';
import { useTranslation } from '../../components/IntlProvider';
import { SupplierForm } from './SupplierForm';

const SupplierAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.suppliers.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <ForegroundSection>
        <SupplierForm />
      </ForegroundSection>
    </>
  );
};

export default SupplierAdd;
