import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Top, TopButtons, TopHeading } from '../../layouts/Top';
import { useCachedAPI } from '../../hooks';
import { CategoryDetailEntity, CategoryFormValues } from './types';
import { Button, ButtonLink, ButtonsGroup } from '../../components/Button';
import { useTranslation } from '../../components/IntlProvider';
import { ForegroundSection } from '../../components/Foreground';
import { endpoint } from '../../common/constants/api';
import { routes } from '../../common/constants/routes';
import { CategoryForm } from './CategoryForm';
import { matchCategoryDataToFormValues } from './utils';
import { useDeleteCategory } from './hooks';

const CategoryDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { categoryId } = useParams<{ categoryId: string }>();
  const { language, translate } = useTranslation();

  const { data: categoryDetail } = useCachedAPI<CategoryDetailEntity>(
    `${endpoint.categories}/${categoryId}`,
  );
  const { deleteCategory } = useDeleteCategory(categoryDetail?._id);

  const formValues: CategoryFormValues | undefined =
    matchCategoryDataToFormValues(categoryDetail, language);

  const handleButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  return (
    <>
      <Top>
        <TopHeading>{categoryDetail?.name[language]}</TopHeading>
        <TopButtons>
          <ButtonsGroup>
            {isReadOnly && (
              <ButtonLink variant="primary" to={routes.categories.add}>
                {translate('add')}
              </ButtonLink>
            )}
            <Button variant="primary" onClick={handleButtonClick}>
              {!isReadOnly ? translate('cancel') : translate('edit')}
            </Button>
            <Button variant="danger" onClick={deleteCategory}>
              {translate('delete')}
            </Button>
          </ButtonsGroup>
        </TopButtons>
      </Top>
      <ForegroundSection>
        <Suspense>
          <CategoryForm
            id={categoryDetail?._id}
            isReadOnly={isReadOnly}
            defaultValues={formValues}
          />
        </Suspense>
      </ForegroundSection>
    </>
  );
};

export default CategoryDetail;
