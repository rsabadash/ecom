import { Suspense } from 'react';
import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { TABLE_WAREHOUSE_PRODUCTS_ID } from '../warehouseProducts/list/constants';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useTranslation } from '../../components/IntlProvider';
import { WarehousesList } from './WarehousesList';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';

const Warehouses = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_WAREHOUSE_PRODUCTS_ID}>
          {translate('warehouses')}
        </TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.warehouses.add}>
            {translate('add')}
          </ButtonLink>
        </TopButtons>
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
