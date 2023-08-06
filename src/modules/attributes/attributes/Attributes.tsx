import { Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ButtonLink, ButtonsGroup } from '../../../components/Button';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { AttributesList } from './AttributesList';
import { TABLE_ATTRIBUTES_ID } from './constants';

const Attributes = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_ATTRIBUTES_ID}>
          {translate('attributes')}
        </TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <ButtonLink variant="primary" to={routes.attributes.add}>
              {translate('add')}
            </ButtonLink>
            <ButtonLink variant="regular" to={routes.attributes.variantsList}>
              {translate('attribute.variant.list')}
            </ButtonLink>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <ErrorBoundary fallback="Error boundary Attributes list">
        <Suspense fallback="Suspense Attributes list">
          <AttributesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Attributes;
