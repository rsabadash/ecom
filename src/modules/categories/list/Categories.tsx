import { Suspense } from 'react';

import { routes } from '../../../common/constants/routes';
import { ButtonLink } from '../../../components/Button';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { CategoriesList } from './CategoriesList';
import { TABLE_CATEGORIES_ID } from './constants';

const Categories = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_CATEGORIES_ID}>
          {translate('categories')}
        </TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.categories.add}>
            {translate('add')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <ErrorBoundary fallback="Error boundary Categories list">
        <Suspense fallback="Suspense Categories list">
          <CategoriesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Categories;
