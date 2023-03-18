import { Suspense } from 'react';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { useTranslation } from '../../../components/IntlProvider';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { WarehouseProductsList } from './WarehouseProductsList';
import { TABLE_WAREHOUSE_PRODUCTS_ID } from './constants';

const WarehouseProducts = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_WAREHOUSE_PRODUCTS_ID}>
          {translate('warehouseProducts')}
        </TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.warehouseProducts.generate}>
            {translate('warehouseProducts.generate')}
          </ButtonLink>
        </TopButtons>
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
