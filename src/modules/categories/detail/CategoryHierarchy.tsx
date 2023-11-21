import { FC } from 'react';

import { Heading } from '../../../components/Heading';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { TABLE_ATTRIBUTE_VARIANTS_ID } from '../../attributes/attributes/list/constants';
import { CategoryHierarchyItem } from './CategoryHierarchyItem';
import { CategoryHierarchyProps } from './types';

import classes from './styles/index.module.css';

export const CategoryHierarchy: FC<CategoryHierarchyProps> = ({
  categories,
}) => {
  const { translate } = useTranslation();
  return (
    <>
      <Heading
        id={TABLE_ATTRIBUTE_VARIANTS_ID}
        level={2}
        fontSize={4}
        classNameHeading={classes.hierarchyTitle}
      >
        {translate('categories.structure')}
      </Heading>
      <SectionForeground>
        <div className={classes.hierarchy}>
          {categories.map((category) => {
            return (
              <CategoryHierarchyItem
                key={category._id}
                category={category}
                level={1}
              />
            );
          })}
        </div>
      </SectionForeground>
    </>
  );
};
