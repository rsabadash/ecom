import { Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { TABLE_SUPPLIERS_ID } from './constants';
import { SuppliersList } from './SuppliersList';

const Suppliers = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_SUPPLIERS_ID}>
          {translate('suppliers.list')}
        </TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.suppliers.add}>
            {translate('add')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <ErrorBoundary fallback="Error boundary Suppliers list">
        <Suspense fallback="Suspense Suppliers list">
          <SuppliersList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Suppliers;
