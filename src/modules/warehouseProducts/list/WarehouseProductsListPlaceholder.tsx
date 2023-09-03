import { routes } from '../../../common/constants/routes';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { EmptyList } from '../../../layouts/EmptyPage';

export const WarehouseProductsListPlaceholder = () => {
  const { translate } = useTranslation();

  return (
    <EmptyList link={routes.warehouseProducts.generate}>
      <Heading level={2} fontSize={2}>
        {translate('warehouseProduct.emptyList')}
      </Heading>
      <Heading level={4} fontSize={4}>
        {translate('warehouseProduct.emptyList.callToAction')}
      </Heading>
    </EmptyList>
  );
};
