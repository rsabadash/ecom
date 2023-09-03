import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { WarehouseForm } from './WarehouseForm';

const WarehouseAdd = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('warehouse.add')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.warehouses.root}>
            {translate('cancel')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <SectionForeground>
        <WarehouseForm />
      </SectionForeground>
    </>
  );
};

export default WarehouseAdd;
