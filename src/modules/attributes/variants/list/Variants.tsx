import { Suspense } from 'react';

import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import { useTranslation } from '../../../../components/IntlProvider';
import { Top, TopHeading } from '../../../../layouts/Top';
import { TABLE_VARIANTS_ID } from './constants';
import { VariantsList } from './VariantsList';

const Variants = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_VARIANTS_ID}>
          {translate('variants.list')}
        </TopHeading>
      </Top>
      <ErrorBoundary fallback="Error boundary Attributes list">
        <Suspense fallback="Suspense Attributes list">
          <VariantsList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Variants;
