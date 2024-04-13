import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopHeading } from '../../../layouts/Top';
import { SupplierAddForm } from './SupplierAddForm';

const SupplierAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('supplier.add')}</TopHeading>
      </Top>
      <SectionForeground>
        <SupplierAddForm />
      </SectionForeground>
    </>
  );
};

export default SupplierAdd;
