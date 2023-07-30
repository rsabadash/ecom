import { useTranslation } from '../../components/IntlProvider';
import { EmptyList } from '../../layouts/EmptyPage';
import { routes } from '../../common/constants/routes';
import { Heading } from '../../components/Heading';

export const WarehousesListPlaceholder = () => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={routes.warehouses.add}>
      <Heading level={2} fontSize={2}>
        {translate('warehouse.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('warehouse.emptyList.callToAction')}
      </Heading>
    </EmptyList>
  );
};
