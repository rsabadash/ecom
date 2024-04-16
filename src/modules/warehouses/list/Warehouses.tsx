import { Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopHeading } from '../../../layouts/Top';
import { SECTION_WAREHOUSES_ID } from './constants';
import { WarehousesList } from './WarehousesList';

const Warehouses = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={SECTION_WAREHOUSES_ID}>
          {translate('warehouses')}
        </TopHeading>
        <ButtonLink variant="primary" to={routes.warehouses.add}>
          {translate('add')}
        </ButtonLink>
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
