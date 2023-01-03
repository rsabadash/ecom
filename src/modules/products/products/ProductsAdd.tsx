import { Suspense, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Top } from '../../../layouts/Top';
import { DropdownAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { ForegroundSection } from '../../../components/Foreground';
import { CategoriesResponse, FormCategoryValues } from './types';
import { formCategoryField } from './constants';
import { mapCategoryToComponent } from './utils';
import { useCachedAPI } from '../../../hooks';
import { endpoint } from '../../../common/constants/api';

const ProductsAdd = () => {
    const { translate } = useTranslation();
    const { control, watch } = useForm<FormCategoryValues>();
    const categoryValue = watch(formCategoryField.category);

    const { data } = useCachedAPI<CategoriesResponse[]>(endpoint.categories);

    const categories = useMemo(() => {
        let result: DropdownItemObject[] = [];
        if (data) {
            return data?.map(({ category }) => ({
                id: category,
                value: translate(`category.${category}`)
            }));
        }

        return result;
    }, [data, translate]);

    return (
        <>
            <Top headingText={translate('products.add')}></Top>
            <ForegroundSection>
                <DropdownAdapter
                    isRequired
                    name={formCategoryField.category}
                    control={control}
                    items={categories}
                    label={translate('category')}
                    placeholder={translate('category.select')}
                />
            </ForegroundSection>

            <ForegroundSection placeholder={translate('category.noProduct')}>
                {categoryValue && (
                    <Suspense>
                        {mapCategoryToComponent()[categoryValue.id]}
                    </Suspense>
                )}
            </ForegroundSection>
        </>
    );
};

export default ProductsAdd;