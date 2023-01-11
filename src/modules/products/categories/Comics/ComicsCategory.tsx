import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from '../../../../components/IntlProvider';
import {
    DropdownAdapter,
    InputAdapter,
    MultiLanguageInputAdapter,
    MultiLanguageTextboxAdapter
} from '../../../../components/FormFieldsAdapter';
import { GridAutoFit, GridFullWidth } from '../../../../layouts/Grid';
import { categories } from '../constants';
import { Button } from '../../../../components/Button';
import { ComicsAttributes, ComicsCategoryFormValues, ComicsNewEntity } from './types';
import { CategoryProps } from '../types';
import { formFields } from './constants';
import { useAPI, useCachedAPI } from '../../../../hooks';
import { ComicsProduct } from '../../products/types';
import { endpoint, query } from '../../../../common/constants/api';
import { TranslationsAllRequired } from '../../../../components/IntlProvider';
import { allTranslationsRequired, mainTranslationRequired } from '../../../../validations/translations';
import classes from '../styles/comicsCategory.module.css';

const schema = yup.object().shape({
    title: yup.object().shape(mainTranslationRequired({
        uk: 'attributes.title.uk.error.required'
    })),
    price: yup.number().required('attributes.price.error.required'),
    publishingHouse: yup.string().required('attributes.publishingHouse.error.required'),
    label: yup.string().required('attributes.label.error.required'),
    language: yup.object().shape(allTranslationsRequired({
        uk: 'attributes.language.error.required',
        en: 'attributes.language.error.required'
    })),
    format: yup.string().required('attributes.format.error.required'),
    cover: yup.object().shape(allTranslationsRequired({
        uk: 'attributes.cover.error.required',
        en: 'attributes.cover.error.required'
    })),
    condition: yup.object().shape(allTranslationsRequired({
        uk: 'attributes.condition.error.required',
        en: 'attributes.condition.error.required'
    })),
    pages: yup.number().required('attributes.pages.error.required'),
    year: yup.number().required('attributes.year.error.required'),
    genre: yup.array().of(yup.object().shape(allTranslationsRequired({
        uk: 'attributes.genre.error.required',
        en: 'attributes.genre.error.required'
    }))).required('attributes.genre.error.required'),
    quantity: yup.number().required('attributes.quantity.error.required'),
    isbn: yup.string().required('attributes.isbn.error.required'),
    description: yup.object().shape(mainTranslationRequired({
        uk: 'attributes.description.uk.error.required'
    }))
}).required();

const ComicsCategory: FC<CategoryProps<ComicsProduct>> = (
    {
        formData,
        isReadOnly,
        onSubmitSuccess,
        onSubmitError
    }
) => {
    const { POST, PATCH } = useAPI();
    const { language: userLanguage, translate } = useTranslation();

    const formValues = formData ? formData : {};
    const shouldUpdateProduct = Object.keys(formValues).length > 0;

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful }
    } = useForm<ComicsCategoryFormValues>({
        defaultValues: formValues,
        resolver: yupResolver(schema)
    });

    const resetFormValues = useCallback(() => {
        !isSubmitSuccessful && reset();
    }, [isSubmitSuccessful, reset]);

    useEffect(() => {
        if (isReadOnly) {
            resetFormValues();
        }
    }, [isReadOnly, resetFormValues])
    
    const { data: attributes } = useCachedAPI<ComicsAttributes>(
        `${endpoint.attributes}?${query.category}=${categories.comics}`,
        { shouldFetch: !isReadOnly }
    );

    const {
        screenwriter,
        artist,
        publishingHouse,
        language,
        format,
        cover,
        condition,
        label,
        character,
        genre,
        year
    } = attributes || {};

    const getTranslatedDropdownValue = (item: null | string | string[] | TranslationsAllRequired | TranslationsAllRequired[]): null | string | string[] => {
        if (!item) {
            return null;
        }

        if (item && Array.isArray(item)) {
            return item.map((i) => typeof i === 'string' ? i : i[userLanguage]);
        }

        return typeof item === 'string' ? item : item[userLanguage]
    };

    const handleFormSubmit = async (values: ComicsCategoryFormValues): Promise<void> => {
        if (attributes && !isReadOnly) {
            const newEntityData: ComicsNewEntity = {
                ...values,
                screenwriter: values.screenwriter ? values.screenwriter : null,
                artist: values.artist ? values.artist : null,
                pages: Number(values.pages),
                year: Number(values.year),
                quantity: Number(values.quantity),
                preorder: false,
                character: values.character ? values.character : null,
                price: Number(values.price),
                discountPrice: values.discountPrice ? Number(values.discountPrice) : null
            };

            try {
                if (shouldUpdateProduct) {
                    await PATCH({ url: endpoint.products, data: newEntityData });
                } else {
                    await POST({ url: endpoint.products, data: newEntityData });
                }

                onSubmitSuccess && onSubmitSuccess();
            } catch (_) {
                onSubmitError && onSubmitError();
            }
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
            <GridAutoFit>
                <GridFullWidth>
                    <MultiLanguageInputAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        isDescriptionHidden={isReadOnly}
                        name={formFields.title}
                        placeholderTranslation="attributes.title.fillIn"
                        label={translate('attributes.title')}
                        control={control}
                    />
                </GridFullWidth>
                <InputAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.price}
                    type="number"
                    placeholder={translate('attributes.price.fillIn')}
                    label={translate('attributes.price')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <InputAdapter
                    isReadOnly={isReadOnly}
                    name={formFields.discountPrice}
                    placeholder={translate('attributes.price.discount.fillIn')}
                    label={translate('attributes.price.discount')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.publishingHouse}
                    items={publishingHouse}
                    placeholder={translate('attributes.publishingHouse.select')}
                    label={translate('attributes.publishingHouse')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.label}
                    items={label}
                    placeholder={translate('attributes.label.select')}
                    label={translate('attributes.label')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.language}
                    customItems={language}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.language.select')}
                    label={translate('attributes.language')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.format}
                    items={format}
                    placeholder={translate('attributes.format.select')}
                    label={translate('attributes.format')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.cover}
                    customItems={cover}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.cover.select')}
                    label={translate('attributes.cover')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.condition}
                    customItems={condition}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.condition.select')}
                    label={translate('attributes.condition')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <InputAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.pages}
                    placeholder={translate('attributes.pages.fillIn')}
                    label={translate('attributes.pages')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.year}
                    items={year}
                    placeholder={translate('attributes.year.fillIn')}
                    label={translate('attributes.year')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.screenwriter}
                    customItems={screenwriter}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.screenwriter.select')}
                    label={translate('attributes.screenwriter')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.artist}
                    customItems={artist}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.artist.select')}
                    label={translate('attributes.artist')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.character}
                    customItems={character}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.character.select')}
                    label={translate('attributes.character')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.genre}
                    customItems={genre}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.genre.select')}
                    label={translate('attributes.genre')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <InputAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.quantity}
                    placeholder={translate('attributes.quantity.fillIn')}
                    label={translate('attributes.quantity')}
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <InputAdapter
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.isbn}
                    placeholder={translate('attributes.isbn.fillIn')}
                    label="ISBN"
                    isDescriptionHidden={isReadOnly}
                    control={control}
                />
                <div className={classes.fullWidthField}>
                    <MultiLanguageTextboxAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        isDescriptionHidden={isReadOnly}
                        name={formFields.description}
                        placeholderTranslation="attributes.description.fillIn"
                        label={translate('attributes.description')}
                        control={control}
                    />
                </div>
            </GridAutoFit>
            {
                !isReadOnly && (
                    <div className={classes.actionButtonWrapper}>
                        <Button variant="primary" type="submit">
                            {shouldUpdateProduct ? translate('update') : translate('add')}
                        </Button>
                    </div>
                )
            }
        </form>
    );
};

export default ComicsCategory;