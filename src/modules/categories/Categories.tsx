import { Suspense } from 'react';
import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { useTranslation } from '../../components/IntlProvider';
import { ButtonLink } from '../../components/Button';
import { routes } from '../../common/constants/routes';
import { TABLE_ID } from './constants';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { CategoriesList } from './CategoriesList';

const Categories = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={TABLE_ID}>{translate('categories')}</TopHeading>
        <TopButtons>
          <ButtonLink variant="primary" to={routes.categories.add}>
            {translate('add')}
          </ButtonLink>
        </TopButtons>
      </Top>
      <ErrorBoundary fallback={<div>{'Error boundary Categories list'}</div>}>
        <Suspense fallback={<div>{'Suspense Categories list'}</div>}>
          <CategoriesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Categories;
