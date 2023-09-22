import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import {
  useCachedAPI,
  useKeepDataBetweenNavigation,
} from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import { Category, CategoryFormValues } from '../common/types';
import { CategoryEditForm } from './CategoryEditForm';
import { useDeleteCategory } from './hooks';
import { CategoryUrlParams, LocationStateFromRouter } from './types';
import { matchCategoryDataToFormValues } from './utils';

const CategoryDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { categoryId } = useParams<CategoryUrlParams>();

  const { language, translate, getTranslationByLanguage } = useTranslation();
  const { getNavigationStateData } = useKeepDataBetweenNavigation();

  const categoryDetailFromLocation =
    getNavigationStateData<LocationStateFromRouter>();

  const { data: categoryDetail, mutate } = useCachedAPI<Category>(
    `${endpoints.categories.root}/${categoryId}`,
    {
      fallbackData: categoryDetailFromLocation,
    },
  );

  const { deleteCategory } = useDeleteCategory(categoryDetail);

  const formValues: CategoryFormValues | undefined =
    matchCategoryDataToFormValues(categoryDetail, language);

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutate();
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const categoryTitle = `${translate('category')} "${getTranslationByLanguage(
    categoryDetail?.name,
  )}"`;

  return (
    <>
      <Top>
        <TopHeading>{categoryTitle}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            <Button variant="primary" onClick={handleButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteCategory}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <SectionForeground>
        <CategoryEditForm
          id={categoryDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
          onFormUpdated={onFormUpdated}
        />
      </SectionForeground>
    </>
  );
};

export default CategoryDetail;
