import { Top } from '../../layouts/Top';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { ForegroundSection } from '../../components/Foreground';
import { useTranslation } from '../../components/IntlProvider';
import { SupplierForm } from './SupplierForm';

const SupplierAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top headingText={translate('suppliers.add')}>
        <ButtonLink variant="primary" to={routes.suppliers.root}>
          {translate('cancel')}
        </ButtonLink>
      </Top>
      <ForegroundSection>
        <SupplierForm />
      </ForegroundSection>
    </>
  );
};

export default SupplierAdd;
