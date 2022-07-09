import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '../../../../components/IntlProvider';
import DropdownAdapter from '../../../../components/FormAdapter/Dropdown';
import InputAdapter from '../../../../components/FormAdapter/Input';
import { GridAutoFit } from '../../../../layouts/Grid';
import { categories } from '../constants';
import Button from '../../../../components/Button';
import { ComicsAttributes, ComicsCategoryFormValues, ComicsNewEntity } from './types';
import { CategoryProps } from '../types';
import { formFields } from './constants';
import { useAPI, useCachedAPI } from '../../../../hooks';
import { ComicsProduct } from '../../products/types';
import { endpoint, query } from '../../../../common/constants/api';
import { Translation } from '../../../../components/IntlProvider';
import { MultiLanguageInput } from '../../../../components/FormAdapter/MultiLanguage';
import classes from '../styles/comicsCategory.module.css';

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
    } = useForm<ComicsCategoryFormValues>({ defaultValues: formValues });

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

    const getTranslatedDropdownValue = (item: null | string | string[] | Translation | Translation[]): null | string | string[] => {
        if (!item) {
            return null;
        }

        if (Array.isArray(item)) {
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <GridAutoFit>
                <MultiLanguageInput
                    isRequired
                    isReadOnly={isReadOnly}
                    name={formFields.title}
                    placeholder={translate('attributes.title.fillIn')}
                    label={translate('attributes.title')}
                    control={control}
                />
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.price}
                        placeholder={translate('attributes.price.fillIn')}
                        label={translate('attributes.price')}
                        control={control}
                    />
                    <InputAdapter
                        isReadOnly={isReadOnly}
                        name={formFields.discountPrice}
                        placeholder={translate('attributes.price.discount.fillIn')}
                        label={translate('attributes.price.discount')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.publishingHouse}
                        items={publishingHouse}
                        placeholder={translate('attributes.publishingHouse.choose')}
                        label={translate('attributes.publishingHouse')}
                        control={control}
                    />
                    <DropdownAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.label}
                        items={label}
                        placeholder={translate('attributes.label.choose')}
                        label={translate('attributes.label')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.language}
                        customItems={language}
                        itemValueGetter={getTranslatedDropdownValue}
                        placeholder={translate('attributes.language.choose')}
                        label={translate('attributes.language')}
                        control={control}
                    />
                    <DropdownAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.format}
                        items={format}
                        placeholder={translate('attributes.format.choose')}
                        label={translate('attributes.format')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.cover}
                        customItems={cover}
                        itemValueGetter={getTranslatedDropdownValue}
                        placeholder={translate('attributes.cover.choose')}
                        label={translate('attributes.cover')}
                        control={control}
                    />
                    <DropdownAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.condition}
                        customItems={condition}
                        itemValueGetter={getTranslatedDropdownValue}
                        placeholder={translate('attributes.condition.choose')}
                        label={translate('attributes.condition')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.pages}
                        placeholder={translate('attributes.pages.fillIn')}
                        label={translate('attributes.pages')}
                        control={control}
                    />
                    <DropdownAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.year}
                        items={year}
                        placeholder={translate('attributes.year.fillIn')}
                        label={translate('attributes.year')}
                        control={control}
                    />
                </GridAutoFit>
                <DropdownAdapter
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.screenwriter}
                    customItems={screenwriter}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.screenwriter.choose')}
                    label={translate('attributes.screenwriter')}
                    control={control}
                />
                <DropdownAdapter
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.artist}
                    customItems={artist}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.artist.choose')}
                    label={translate('attributes.artist')}
                    control={control}
                />
                <DropdownAdapter
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.character}
                    customItems={character}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.character.choose')}
                    label={translate('attributes.character')}
                    control={control}
                />
                <DropdownAdapter
                    isRequired
                    hasMultiselect
                    isReadOnly={isReadOnly}
                    name={formFields.genre}
                    customItems={genre}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.genre.choose')}
                    label={translate('attributes.genre')}
                    control={control}
                />
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.quantity}
                        placeholder={translate('attributes.quantity.fillIn')}
                        label={translate('attributes.quantity')}
                        control={control}
                    />
                    <InputAdapter
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.isbn}
                        placeholder={translate('attributes.isbn.fillIn')}
                        label="ISBN"
                        control={control}
                    />
                </GridAutoFit>
                <div className={classes.descriptionField}>
                    <MultiLanguageInput
                        isRequired
                        isReadOnly={isReadOnly}
                        name={formFields.description}
                        placeholder={translate('attributes.description.fillIn')}
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