import { FC, useEffect, useRef, useState } from 'react';

import { endpoints } from '../../../common/constants/api';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { TopButtons } from '../../../layouts/Top';
import { TABLE_ATTRIBUTE_VARIANTS_ID } from '../../attributes/attributes/list/constants';
import { Category } from '../common/types';
import { CategoryHierarchyItem } from './CategoryHierarchyItem';
import { CategoryHierarchyProps, CategoryParenIdsMap } from './types';

import classes from './styles/index.module.css';

export const CategoryHierarchy: FC<CategoryHierarchyProps> = ({
  categoryParents,
}) => {
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
    if (categoryParents && categoryParents.length > 0) {
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
  }, [categoryParents]);

  return (
    <>
      <div className={classes.hierarchyTopSection}>
        <Heading id={TABLE_ATTRIBUTE_VARIANTS_ID} level={2} fontSize={4}>
          {translate('categories.hierarchy')}
        </Heading>
        <TopButtons>
          <ButtonsGroup>
            <Button
              variant="regular"
              size="xs"
              onClick={() => setIsHierarchyCollapsed(true)}
            >
              {translate('categories.hierarchy.collapse')}
            </Button>
            <Button
              variant="primary"
              size="xs"
              onClick={() => setShowCategoryInHierarchy(true)}
            >
              {translate('category.showInHierarchy')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </div>
      <SectionForeground>
        <div className={classes.hierarchy}>
          {categoriesRootList.map((category) => {
            return (
              <CategoryHierarchyItem
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
