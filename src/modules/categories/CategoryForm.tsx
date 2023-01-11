import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { useAPI, useCachedAPI, useTranslatedDropdownValue } from '../../hooks';
import { useTranslation } from '../../components/IntlProvider';
import { DropdownAdapter, MultiLanguageInputAdapter } from '../../components/FormFieldsAdapter';
import { formFields } from './constants';
import { Button } from '../../components/Button';
import { mainTranslationRequired } from '../../validations/translations';
import { CheckboxAdapter } from '../../components/FormFieldsAdapter/CheckboxAdabter/CheckboxAdapter';
import {
    Category,
    CategoryDeleteData,
    CategoryFormProps,
    CategoryFormValues,
    CategoryPostData,
    CategoryPostResponse
} from './types';
import { endpoint } from '../../common/constants/api';

const schema = yup.object().shape({
    name: yup.object().shape(mainTranslationRequired({
        uk: 'category.name.error.required'
    })).required(),
});

const CategoryForm: FC<CategoryFormProps> = (
    {
        id,
        formValues,
        isReadOnly
    }
) => {
    const { POST, DELETE } = useAPI();
    const { data } = useCachedAPI<Category[]>(`${endpoint.categories}`);

    const { translate } = useTranslation();
    const { translateDropdownValue } = useTranslatedDropdownValue();

    const { control, handleSubmit, reset, formState: { isDirty, isSubmitted } } = useForm<CategoryFormValues>({
        resolver: yupResolver(schema),
        defaultValues: formValues,
    });

    useEffect(() => {
        if (isReadOnly) {
            if (isDirty && !isSubmitted) {
                reset();
            }
        }
    }, [reset, isReadOnly, isSubmitted, isDirty]);

    const categoryValueGetter = (item: null | string | Category | Category[]): string | string[] => {
        if (!item) {
            return [];
        }

        if (typeof item === 'string') {
            return item;
        }

        if (Array.isArray(item)) {
            return item.reduce<string[]>((acc, i) => {
                const value = translateDropdownValue(i.name);

                if (typeof value === 'string') {
                    acc.push(value);
                }

                return acc;
            }, []);
        }

        const value = translateDropdownValue(item.name);

        return value || [];
    };

    const getCategoryIds = (categories: Category[]): string[] => {
        return categories.map((category) => category._id);
    };

    const handleFormSubmit = async (value: CategoryFormValues) => {
        const data: CategoryPostData = {
            ...value,
            parentIds: getCategoryIds(value.parentIds)
        };

        await POST<CategoryPostResponse, CategoryPostData>({ url: endpoint.categories, data });
    };

    const handleDeleteCategory = async () => {
        if (id) {
            await DELETE<void, CategoryDeleteData>({ url: endpoint.categories, data: { id } });
        }
    };

    const shouldUpdateProduct = formValues && Object.keys(formValues).length > 0;

    return (
        <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
            <GridAutoFit>
                <GridFullWidth>
                    <MultiLanguageInputAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        isDescriptionHidden={isReadOnly}
                        name={formFields.name}
                        placeholderTranslation="category.name.fillIn"
                        label={translate('category.name')}
                        control={control}
                    />
                </GridFullWidth>
                <GridFullWidth>
                    <DropdownAdapter
                        hasMultiselect
                        isReadOnly={isReadOnly}
                        isDescriptionHidden={isReadOnly}
                        name={formFields.parentIds}
                        customItems={data}
                        itemValueGetter={categoryValueGetter}
                        placeholder={translate('category.parent.select')}
                        label={translate('category.parent')}
                        control={control}
                    />
                </GridFullWidth>
                <GridFullWidth>
                    <CheckboxAdapter
                        isReadOnly={isReadOnly}
                        isDescriptionHidden={isReadOnly}
                        name={formFields.isActive}
                        label={translate('category.active')}
                        placeholder={translate('category.active.description')}
                        control={control}
                    />
                </GridFullWidth>
                {!isReadOnly && (
                    <GridFullWidth>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Button variant="primary" type="submit">
                                {shouldUpdateProduct ? translate('category.update') : translate('category.add')}
                            </Button>
                            {shouldUpdateProduct && (
                                <Button variant="danger" onClick={handleDeleteCategory}>
                                    {translate('category.delete')}
                                </Button>
                            )}
                        </div>
                    </GridFullWidth>
                )}
            </GridAutoFit>
        </form>
    );
};

export { CategoryForm };