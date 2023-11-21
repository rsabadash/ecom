import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { endpoints } from '../../../common/constants/api';
import {
  useCachedAPI,
  useCachedPaginationAPI,
  useKeepDataBetweenNavigation,
} from '../../../common/hooks';
import { Button, ButtonsGroup } from '../../../components/Button';
import { useTranslation } from '../../../components/IntlProvider';
import { SectionForeground } from '../../../layouts/Section';
import { Top, TopButtons, TopHeading } from '../../../layouts/Top';
import {
  Category,
  CategoryFormValues,
  CategoryStateFromRouter,
} from '../common/types';
import { CategoryEditForm } from './CategoryEditForm';
import { CategoryHierarchy } from './CategoryHierarchy';
import { useDeleteCategory } from './hooks';
import { CategoryDetailData, CategoryUrlParams } from './types';
import { mapCategoryDataToFormValues } from './utils';

const Test = ({ category }: { category: Category }) => {
  const isOpenPersistRef = useRef<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { getTranslationByLanguage } = useTranslation();
  const { childrenIds, name } = category;

  const ids = childrenIds.toString();

  const { list: categories } = useCachedPaginationAPI<Category>(
    `${endpoints.categories.root}?ids=${ids}`,
    {
      limit: 50,
      // it reduces number of calls on toggling isOpen
      shouldFetch: isOpenPersistRef.current && !!ids,
    },
  );

  const onCategoryClick = () => {
    setIsOpen((preIsOpen) => !preIsOpen);

    if (!isOpenPersistRef.current) {
      isOpenPersistRef.current = true;
    }
  };

  return (
    <div>
      <div
        onClick={onCategoryClick}
        style={{ borderBottom: '1px solid gray', cursor: 'pointer' }}
      >
        {getTranslationByLanguage(name)}
      </div>
      {isOpen &&
        categories.map((category) => {
          return <Test key={category._id} category={category} />;
        })}
    </div>
  );
};

const CategoryDetail = () => {
  const [isReadOnly, setReadOnly] = useState<boolean>(true);

  const { categoryId } = useParams<CategoryUrlParams>();

  const { language, translate, getTranslationByLanguage } = useTranslation();
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

  const { list: categoriesRootList } = useCachedPaginationAPI<Category>(
    `${endpoints.categories.root}?parentIds=root`,
    {
      limit: 50,
    },
  );

  const { deleteCategory } = useDeleteCategory(categoryDetail);

  const formValues: CategoryFormValues | undefined =
    mapCategoryDataToFormValues(categoryDetail, language);

  const handleEditButtonClick = (): void => {
    setReadOnly((isReadOnly) => !isReadOnly);
  };

  const onFormUpdated = (): void => {
    mutateCategory();
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
            <Button variant="primary" onClick={handleEditButtonClick}>
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
      <CategoryHierarchy categories={categoriesRootList} />
    </>
  );
};

export default CategoryDetail;
