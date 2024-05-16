import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import {
  useCachedAPI,
  useKeepDataBetweenNavigation,
} from '../../../common/hooks';
import { ModuleDetailActions } from '../../../components/Intermodular/ModuleDetailActions';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopHeading } from '../../../layouts/Top';
import { CategoryFormValues, CategoryStateFromRouter } from '../common/types';
import { CategoryEditForm } from './CategoryEditForm';
import { CategoryHierarchySection } from './CategoryHierarchySection';
import { useDeleteCategory } from './hooks';
import { CategoryDetailData, CategoryUrlParams } from './types';
import { mapCategoryDataToFormValues } from './utils';

const CategoryDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { categoryId } = useParams<CategoryUrlParams>();

  const { translate } = useTranslation();
  const { getNavigationStateData } = useKeepDataBetweenNavigation();

  const categoryDetailFromLocation =
    getNavigationStateData<CategoryStateFromRouter>();

  const { data: categoryDetail, mutate: mutateCategory } =
    useCachedAPI<CategoryDetailData>(
      `${endpoints.categories.root}/${categoryId}`,
      {
        fallbackData: categoryDetailFromLocation,
      },
    );

  const { parents } = categoryDetail || {};

  const { deleteCategory } = useDeleteCategory(categoryDetail);

  const formValues: CategoryFormValues | undefined =
    mapCategoryDataToFormValues(categoryDetail);

  const toggleReadOnly = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutateCategory();
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const categoryTitle = `${translate('category')} "${categoryDetail?.name}"`;

  return (
    <>
      <Top>
        <TopHeading>{categoryTitle}</TopHeading>
        <ModuleDetailActions
          onEdit={toggleReadOnly}
          onDelete={deleteCategory}
          isReadOnly={isReadOnly}
        />
      </Top>
      <SectionForeground>
        <CategoryEditForm
          id={categoryDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
          onFormReset={toggleReadOnly}
          onFormUpdated={onFormUpdated}
        />
      </SectionForeground>
      <CategoryHierarchySection categoryParents={parents} />
    </>
  );
};

export default CategoryDetail;
