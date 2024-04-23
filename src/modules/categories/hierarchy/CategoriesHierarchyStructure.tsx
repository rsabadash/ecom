import { FC, useEffect, useRef, useState } from 'react';

import { endpoints } from '../../../common/constants/api';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Category } from '../common/types';
import { CategoriesHierarchyItem } from './CategoriesHierarchyItem';
import { CATEGORY_HIERARCHY_ID } from './constants';
import {
  CategoriesHierarchyStructureProps,
  CategoryParenIdsMap,
} from './types';

import classes from './styles/index.module.css';

export const CategoriesHierarchyStructure: FC<
  CategoriesHierarchyStructureProps
> = ({ categoryParents, showCategoryEnabled }) => {
  const { list: categoriesRootList } = useCachedPaginationAPI<Category>(
    `${endpoints.categories.root}?parentIds=root`,
    {
      limit: 50,
    },
  );

  const [isHierarchyCollapsed, setIsHierarchyCollapsed] = useState(true);
  const [showCategoryInHierarchy, setShowCategoryInHierarchy] = useState(false);

  const parentIdsMapRef = useRef<CategoryParenIdsMap | undefined>(undefined);

  const { translate } = useTranslation();

  const resetShowCategoryInHierarchy = () => {
    setShowCategoryInHierarchy(false);
  };

  const resetIsHierarchyCollapsed = () => {
    setIsHierarchyCollapsed(false);
  };

  useEffect(() => {
    if (showCategoryEnabled && categoryParents && categoryParents.length > 0) {
      parentIdsMapRef.current = categoryParents.reduce<CategoryParenIdsMap>(
        (acc, parent) => {
          return {
            ...acc,
            [parent._id]: true,
          };
        },
        {},
      );
    }
  }, [categoryParents, showCategoryEnabled]);

  return (
    <>
      <div className={classes.hierarchyTopSection}>
        <ButtonsGroup>
          <Button
            variant="regular"
            size="xs"
            onClick={() => setIsHierarchyCollapsed(true)}
          >
            {translate('categories.hierarchy.collapse')}
          </Button>
          {showCategoryEnabled && (
            <Button
              variant="primary"
              size="xs"
              onClick={() => setShowCategoryInHierarchy(true)}
            >
              {translate('category.showInHierarchy')}
            </Button>
          )}
        </ButtonsGroup>
      </div>
      <SectionForeground sectionLabeledBy={CATEGORY_HIERARCHY_ID}>
        <div className={classes.hierarchy}>
          {categoriesRootList.map((category) => {
            return (
              <CategoriesHierarchyItem
                key={category._id}
                level={1}
                category={category}
                handleOnExpand={resetIsHierarchyCollapsed}
                handleOnCollapse={resetShowCategoryInHierarchy}
                categoryParenIdsMap={parentIdsMapRef.current}
                isHierarchyCollapsed={isHierarchyCollapsed}
                showCategoryInHierarchy={showCategoryInHierarchy}
              />
            );
          })}
        </div>
      </SectionForeground>
    </>
  );
};
