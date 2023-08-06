import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../common/constants/api';
import { useCachedAPI } from '../../common/hooks';
import { Button, ButtonsGroup } from '../../components/Button';
import { useTranslation } from '../../components/IntlProvider';
import { SectionForeground } from '../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { CategoryForm } from './CategoryForm';
import { useDeleteCategory } from './hooks';
import {
  CategoryDetailEntity,
  CategoryFormValues,
  CategoryUrlParams,
} from './types';
import { matchCategoryDataToFormValues } from './utils';

const CategoryDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { categoryId } = useParams<CategoryUrlParams>();
  const { language, translate } = useTranslation();

  const { data: categoryDetail } = useCachedAPI<CategoryDetailEntity>(
    `${endpoints.categories.root}/${categoryId}`,
  );
  const { deleteCategory } = useDeleteCategory(categoryDetail?._id);

  const formValues: CategoryFormValues | undefined =
    matchCategoryDataToFormValues(categoryDetail, language);

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const categoryTitle = `${translate('category')} "${
    categoryDetail?.name[language]
  }"`;
  console.log(formValues);
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
        <CategoryForm
          id={categoryDetail?._id}
          isReadOnly={isReadOnly}
          defaultValues={formValues}
        />
      </SectionForeground>
    </>
  );
};

export default CategoryDetail;
