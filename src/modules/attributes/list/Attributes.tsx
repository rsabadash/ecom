import { Suspense } from 'react';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { useTranslation } from '../../../components/IntlProvider';
import { ButtonLink } from '../../../components/Button';
import { routes } from '../../../common/constants/routes';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { AttributesList } from './AttributesList';
import { TABLE_ATTRIBUTES_ID } from '../common/constants';

const Attributes = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_ATTRIBUTES_ID}>
          {translate('attributes')}
        </TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.attributes.add}>
            {translate('add')}
          </ButtonLink>
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
