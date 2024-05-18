import { CSSProperties, FC, useRef, useState } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import { routes } from '../../../common/constants/routes';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { Collapse } from '../../../components/Collapse';
import { Category } from '../common/types';
import { preventEvent } from '../detail/utils';
import { CATEGORY_HIERARCHY_ITEM_ID } from './constants';
import { CategoriesHierarchyItemProps } from './types';

import classes from './styles/index.module.css';

export const CategoriesHierarchyItem: FC<CategoriesHierarchyItemProps> = ({
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

  // TODO improve loading state
  const header =
    isOpenPersistRef.current && !isChildrenCategoriesLoaded
      ? `${name} loading...`
      : name;

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
        ariaLabel={name}
        ariaControls={`${CATEGORY_HIERARCHY_ITEM_ID}-${ids}`}
        body={
          isOpenPersistRef.current
            ? categories.map((category) => {
                return (
                  <CategoriesHierarchyItem
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
