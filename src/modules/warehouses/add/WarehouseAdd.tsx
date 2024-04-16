import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopHeading } from '../../../layouts/Top';
import { WarehouseAddForm } from './WarehouseAddForm';

const WarehouseAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('warehouse.add')}</TopHeading>
      </Top>
      <SectionForeground>
        <WarehouseAddForm />
      </SectionForeground>
    </>
  );
};

export default WarehouseAdd;
