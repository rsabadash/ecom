import { Suspense } from 'react';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useTranslation } from '../../../components/IntlProvider';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { TABLE_VARIANTS_ID } from '../common/constants';
import { VariantsList } from '../common/VariantsList';
import { useCachedAPI } from '../../../hooks';
import { Variant } from '../common/types';
import { endpoints } from '../../../common/constants/api';
import { ButtonLink, ButtonsGroup } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';

const Variants = () => {
  const { translate } = useTranslation();
  const { data = [] } = useCachedAPI<Variant[]>(
    `${endpoints.attributes.variants}`,
  );

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
          <VariantsList isDetailList={false} variants={data} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Variants;
