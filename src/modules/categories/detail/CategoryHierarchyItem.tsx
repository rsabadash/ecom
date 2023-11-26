import { CSSProperties, FC, useRef, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { Collapse } from '../../../components/Collapse';
import { useTranslation } from '../../../components/IntlProvider';
import { Category } from '../common/types';
import { CATEGORY_HIERARCHY_ITEM_ID } from './constants';
import { CategoryHierarchyItemProps } from './types';
import { preventEvent } from './utils';

import classes from './styles/index.module.css';

export const CategoryHierarchyItem: FC<CategoryHierarchyItemProps> = ({
  level,
  category,
  handleOnExpand,
  handleOnCollapse,
  categoryParenIdsMap,
  isHierarchyCollapsed,
  showCategoryInHierarchy,
}) => {
  const isOpenPersistRef = useRef<boolean>(false);
  const [, setShouldFetch] = useState<boolean>(false);

  const { getTranslationByLanguage } = useTranslation();
  const { childrenIds, name } = category;

  const ids = childrenIds.toString();
  const hasChildren = !!ids;

  const { list: categories } = useCachedPaginationAPI<Category>(
    `${endpoints.categories.root}?ids=${ids}`,
    {
      limit: 50,
      // it reduces number of calls on toggling children categories
      shouldFetch: isOpenPersistRef.current && hasChildren,
    },
  );

  const isChildrenCategoriesLoaded = categories.length > 0;

  const onBeforeCategoryExpand = () => {
    if (!isOpenPersistRef.current) {
      setShouldFetch(true);
      isOpenPersistRef.current = true;
    }
  };

  const categoryDetailPath = generatePath(routes.categories.detail, {
    categoryId: category._id,
  });

  const translatedCategoryName = getTranslationByLanguage(name);

  // TODO improve loading state
  const header =
    isOpenPersistRef.current && !isChildrenCategoriesLoaded
      ? `${translatedCategoryName} loading...`
      : translatedCategoryName;

  const styleVariables = {
    '--hierarchy-level': level,
  } as CSSProperties;

  return (
    <div className={classes.hierarchy__item} style={styleVariables}>
      <Collapse
        isToggleableHeader
        forceExpand={
          showCategoryInHierarchy && categoryParenIdsMap?.[category._id]
        }
        // TODO Discuss if we want to force auto close when category is being changed
        forceCollapse={isHierarchyCollapsed}
        isCollapseDisabled={!hasChildren}
        isToggleHidden={!hasChildren}
        waitUntilBodyLoaded
        isBodyLoaded={isChildrenCategoriesLoaded}
        onBeforeExpand={onBeforeCategoryExpand}
        onExpand={handleOnExpand}
        onCollapse={handleOnCollapse}
        headerClassName={classes.hierarchy__itemContent}
        header={
          <>
            {header}
            <Link
              to={categoryDetailPath}
              style={{ color: 'white' }}
              onClick={preventEvent}
            >
              {category._id}
            </Link>
            {category.parentIdsHierarchy.length > 0 && (
              <ul>
                {category.parentIdsHierarchy.map((id) => {
                  return <li key={id}>{id}</li>;
                })}
              </ul>
            )}
          </>
        }
        ariaLabel={translatedCategoryName}
        ariaControls={`${CATEGORY_HIERARCHY_ITEM_ID}-${ids}`}
        body={
          isOpenPersistRef.current
            ? categories.map((category) => {
                return (
                  <CategoryHierarchyItem
                    key={category._id}
                    level={level + 1}
                    category={category}
                    handleOnExpand={handleOnExpand}
                    handleOnCollapse={handleOnCollapse}
                    categoryParenIdsMap={categoryParenIdsMap}
                    isHierarchyCollapsed={isHierarchyCollapsed}
                    showCategoryInHierarchy={showCategoryInHierarchy}
                  />
                );
              })
            : null
        }
      />
    </div>
  );
};
