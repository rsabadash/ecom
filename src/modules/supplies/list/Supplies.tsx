import { Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { TABLE_SUPPLIES_ID } from './constants';
import { SuppliesList } from './SuppliesList';

const Supplies = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_SUPPLIES_ID}>
          {translate('supplies.list')}
        </TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.supplies.add}>
            {translate('add')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <ErrorBoundary fallback="Error boundary Supplies list">
        <Suspense fallback="Suspense Supplies list">
          <SuppliesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Supplies;
