import { Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopHeading } from '../../../layouts/Top';
import { TABLE_WAREHOUSE_PRODUCTS_ID } from './constants';
import { WarehouseProductsList } from './WarehouseProductsList';

const WarehouseProducts = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_WAREHOUSE_PRODUCTS_ID}>
          {translate('warehouseProducts')}
        </TopHeading>
        <ButtonLink variant="primary" to={routes.warehouseProducts.generate}>
          {translate('warehouseProducts.generate')}
        </ButtonLink>
      </Top>
      <ErrorBoundary fallback="Error boundary Warehouse products list">
        <Suspense fallback="Suspense Warehouse products list">
          <WarehouseProductsList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default WarehouseProducts;
