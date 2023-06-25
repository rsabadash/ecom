import { Suspense } from 'react';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { useTranslation } from '../../../components/IntlProvider';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { SuppliesList } from './SuppliesList';
import { TABLE_SUPPLIES_ID } from './constants';

const Supplies = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_SUPPLIES_ID}>{translate('supplies')}</TopHeading>
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
