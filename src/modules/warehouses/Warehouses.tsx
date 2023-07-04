import { Suspense } from 'react';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useTranslation } from '../../components/IntlProvider';
import { Top, TopHeading } from '../../layouts/Top';
import { TABLE_WAREHOUSE_PRODUCTS_ID } from '../warehouseProducts/list/constants';
import { WarehousesList } from './WarehousesList';

const Warehouses = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_WAREHOUSE_PRODUCTS_ID}>
          {translate('warehouses')}
        </TopHeading>
      </Top>
      <ErrorBoundary fallback="Error boundary Warehouses list">
        <Suspense fallback="Suspense Warehouses list">
          <WarehousesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Warehouses;
