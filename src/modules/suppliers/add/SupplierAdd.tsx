import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { SupplierForm } from '../detail/SupplierForm';

const SupplierAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('supplier.add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.suppliers.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <SectionForeground>
        <SupplierForm />
      </SectionForeground>
    </>
  );
};

export default SupplierAdd;
