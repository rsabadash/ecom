import { CSSProperties, FC, useRef, useState } from 'react';

import { endpoints } from '../../../common/constants/api';
import { useCachedPaginationAPI } from '../../../common/hooks';
import { Collapse } from '../../../components/Collapse';
import { useTranslation } from '../../../components/IntlProvider';
import { Category } from '../common/types';
import { CATEGORY_HIERARCHY_ITEM_ID } from './constants';
import { CategoryHierarchyItemProps } from './types';

import classes from './styles/index.module.css';

export const CategoryHierarchyItem: FC<CategoryHierarchyItemProps> = ({
  category,
  level,
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

  const onCategoryClick = () => {
    if (!isOpenPersistRef.current) {
      setShouldFetch(true);
      isOpenPersistRef.current = true;
    }
  };

  const styleVariables = {
    '--hierarchy-level': level,
  } as CSSProperties;

  const translatedCategoryName = `${getTranslationByLanguage(name)} ${
    category._id
  }`;

  // TODO improve loading state
  const header =
    isOpenPersistRef.current && !isChildrenCategoriesLoaded
      ? `${translatedCategoryName} loading...`
      : translatedCategoryName;

  return (
    <div className={classes.hierarchy__item} style={styleVariables}>
      <Collapse
        isToggleableHeader
        isCollapseDisabled={!hasChildren}
        isToggleHidden={!hasChildren}
        waitUntilBodyLoaded
        isBodyLoaded={isChildrenCategoriesLoaded}
        onBeforeExpand={onCategoryClick}
        headerClassName={classes.hierarchy__itemContent}
        header={
          <>
            {header}
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
                    category={category}
                    level={level + 1}
                  />
                );
              })
            : null
        }
      />
    </div>
  );
};
