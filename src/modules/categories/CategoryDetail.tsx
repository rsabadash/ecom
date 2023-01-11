import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Top, TopButtons } from '../../layouts/Top';
import { useCachedAPI } from '../../hooks';
import { CategoryDetailEntity, CategoryFormValues } from './types';
import { Button, ButtonLink } from '../../components/Button';
import { useTranslation } from '../../components/IntlProvider';
import { ForegroundSection } from '../../components/Foreground';
import { endpoint } from '../../common/constants/api';
import { routes } from '../../common/constants/routes';
import { CategoryForm } from './CategoryForm';
import { matchDataToFormValues } from './utils';

const CategoryDetail = () => {
    const [isReadOnly, setReadOnly] = useState<boolean>(true);

    const { categoryId } = useParams<{ categoryId: string }>();
    const { language, translate } = useTranslation();

    const { data } = useCachedAPI<CategoryDetailEntity>(`${endpoint.categories}/${categoryId}`);

    const formValues: CategoryFormValues | undefined = matchDataToFormValues(data);

    const handleButtonClick = (): void => {
        setReadOnly((isReadOnly) => !isReadOnly);
    };

    return (
        <>
            <Top headingText={data?.name[language]}>
                <TopButtons>
                    {isReadOnly && (
                        <ButtonLink variant="primary" to={routes.categoriesAdd}>
                            {translate('category.add')}
                        </ButtonLink>
                    )}
                    <Button variant="primary" onClick={handleButtonClick}>
                        {!isReadOnly ? translate('cancel') : translate('category.edit')}
                    </Button>
                </TopButtons>
            </Top>

            <ForegroundSection>
                <Suspense>
                    <CategoryForm id={data?._id} formValues={formValues} isReadOnly={isReadOnly} />
                </Suspense>
            </ForegroundSection>
        </>
    );
};

export default CategoryDetail;