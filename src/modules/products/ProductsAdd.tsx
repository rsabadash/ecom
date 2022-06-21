import { lazy, Suspense, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Top from '../../layouts/Top';
import DropdownAdapter from '../../components/FormAdapter/Dropdown';
import { useTranslation } from '../../components/IntlProvider';
import { fetchCategories } from './api';
import { DropdownItemObject } from '../../components/Form/Dropdown';
import { Section } from '../../components/Section';
import { MapCategoryToComponent,FormCategoryValues } from './types';
import { formCategoryField } from './constants';

const ComicsCategory = lazy(() => import('./categories').then(module => ({ default: module.ComicsCategory })));

const mapCategoryToComponent: MapCategoryToComponent = {
    comics: <ComicsCategory />
};

const resource = fetchCategories();

const ProductsAdd = () => {
    const { translate } = useTranslation();
    const { control, watch } = useForm<FormCategoryValues>();

    const categoryValue = watch(formCategoryField.category);

    const categories = useMemo(() => {
        let result: DropdownItemObject[] = [];
        const items = resource.categories.read();

        if (items) {
            return items?.map(({ category }) => ({
                id: category,
                value: translate(`category.${category}`)
            }));
        }

        return result;
    }, [translate]);

    return (
        <>
            <Top headingText={translate('products.add')}></Top>
            <Section>
                <DropdownAdapter
                    name={formCategoryField.category}
                    control={control}
                    items={categories}
                    label={translate('category')}
                    placeholder={translate('category.choose')}
                />
            </Section>

            <Section placeholder={translate('category.noProduct')}>
                {categoryValue && (
                    <Suspense>
                        {mapCategoryToComponent[categoryValue.id]}
                    </Suspense>
                )}
            </Section>
        </>
    );
};

export default ProductsAdd;