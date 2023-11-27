import { Suspense } from 'react';

import { useTranslation } from '../../../components/IntlProvider';
import { Top, TopHeading } from '../../../layouts/Top';
import { CategoriesHierarchyStructure } from './CategoriesHierarchyStructure';
import { CATEGORY_HIERARCHY_ID } from './constants';

export const CategoriesHierarchy = () => {
  const { translate } = useTranslation();

  return (
    <>
      <Top>
        <TopHeading id={CATEGORY_HIERARCHY_ID}>
          {translate('categories.hierarchy')}
        </TopHeading>
      </Top>
      <Suspense fallback="Route CategoriesHierarchyStructure">
        <CategoriesHierarchyStructure />
      </Suspense>
    </>
  );
};

export default CategoriesHierarchy;
