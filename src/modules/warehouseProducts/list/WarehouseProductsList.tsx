import { Suspense } from 'react';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { useTranslation } from '../../../components/IntlProvider';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

const WarehouseProductsList = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading>{translate('warehouseProducts')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.warehouseProducts.generate}>
            {translate('warehouseProducts.generate')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <ErrorBoundary fallback="Error boundary Warehouse products list">
        <Suspense fallback="Suspense Warehouse products list">List</Suspense>
      </ErrorBoundary>
    </>
  );
};

export default WarehouseProductsList;
