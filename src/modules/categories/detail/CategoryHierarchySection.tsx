import { FC, Suspense } from 'react';

import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { CategoriesHierarchyStructure } from '../hierarchy/CategoriesHierarchyStructure';
import { CATEGORY_HIERARCHY_ID } from '../hierarchy/constants';
import { CategoryHierarchySectionProps } from './types';

import classes from './styles/index.module.css';

export const CategoryHierarchySection: FC<CategoryHierarchySectionProps> = ({
  categoryParents,
}) => {
  const { translate } = useTranslation();

  return (
    <div className={classes.hierarchySection}>
      <Heading id={CATEGORY_HIERARCHY_ID} level={2} fontSize={4}>
        {translate('categories.hierarchy')}
      </Heading>
      <Suspense fallback="Route CategoriesHierarchySection">
        <CategoriesHierarchyStructure
          showCategoryEnabled
          categoryParents={categoryParents}
        />
      </Suspense>
    </div>
  );
};
