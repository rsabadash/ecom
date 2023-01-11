import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { Top } from '../../../layouts/Top';
import { DropdownAdapter } from '../../../components/FormFieldsAdapter';
import { useTranslation } from '../../../components/IntlProvider';
import { ForegroundSection } from '../../../components/Foreground';
import { FormCategoryValues } from './types';
import { formCategoryField } from './constants';
import { mapCategoryToComponent } from './utils';

const ProductsAdd = () => {
    const { translate } = useTranslation();
    const { control, watch } = useForm<FormCategoryValues>();
    const categoryValue = watch(formCategoryField.category);

    const categories = [{
        id: 'comics',
        value: translate('category.comics')
    }];

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