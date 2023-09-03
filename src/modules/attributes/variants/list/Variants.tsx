import { Suspense } from 'react';

import { routes } from '../../../../common/constants/routes';
import { ButtonLink, ButtonsGroup } from '../../../../components/Button';
import { ErrorBoundary } from '../../../../components/ErrorBoundary';
import { useTranslation } from '../../../../components/IntlProvider';
import { Top, TopButtons, TopHeading } from '../../../../layouts/Top';
import { TABLE_VARIANTS_ID } from './constants';
import { VariantsList } from './VariantsList';

const Variants = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_VARIANTS_ID}>
          {translate('attribute.variants')}
        </TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <ButtonLink variant="regular" to={routes.attributes.root}>
              {translate('attribute.attributes.list')}
            </ButtonLink>
          </ButtonsGroup>
        </TopButtons>
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
