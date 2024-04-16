import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopHeading } from '../../../layouts/Top';
import { SupplyForm } from './SupplyForm';

const SupplyAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('supply.add')}</TopHeading>
      </Top>
      <SupplyForm />
    </>
  );
};

export default SupplyAdd;
