import { Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopHeading } from '../../../layouts/Top';
import { TABLE_PRODUCTS_ID } from './constants';
import { ProductsList } from './ProductsList';

const Products = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_PRODUCTS_ID}>{translate('products')}</TopHeading>
        <ButtonLink variant="primary" to={routes.products.generate}>
          {translate('products.generate')}
        </ButtonLink>
      </Top>
      <ErrorBoundary fallback="Error boundary Products list">
        <Suspense fallback="Suspense Products list">
          <ProductsList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Products;
