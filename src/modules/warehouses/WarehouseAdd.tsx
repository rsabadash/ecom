import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { SectionForeground } from '../../layouts/Section';
import { useTranslation } from '../../components/IntlProvider';
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
