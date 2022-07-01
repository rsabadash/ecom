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
import { POST } from '../../../../utils/api';
import { useCachedAPI } from '../../../../hooks';
import { ComicsProduct } from '../../products/types';
import { endpoint, query } from '../../../../common/constants/api';
import { Translation } from '../../../../components/IntlProvider';
import classes from '../styles/comicsCategory.module.css';

const ComicsCategory: FC<CategoryProps<ComicsProduct>> = (
    {
        formData,
        readOnly,
        onSubmitSuccess,
        onSubmitError
    }
) => {
    const { language: userLanguage, translate } = useTranslation();

    const formValues = formData ? formData : {};

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
        if (readOnly) {
            resetFormValues();
        }
    }, [readOnly, resetFormValues])
    
    const { data: attributes } = useCachedAPI<ComicsAttributes>(
        `${endpoint.attributes}?${query.category}=${categories.comics}`,
        { shouldFetch: !readOnly }
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
        genre
    } = attributes || {};

    const getTranslatedInputValue = (value: undefined | Translation): string => {
        return value ? value[userLanguage] : '';
    };

    const getTranslatedDropdownValue = (item: null | string | string[] | Translation | Translation[]): undefined | string | string[] => {
        if (!item) {
            return undefined;
        }

        if (Array.isArray(item)) {
            return item.map((i) => typeof i === 'string' ? i : i[userLanguage]);
        }

        return typeof item === 'string' ? item : item[userLanguage]
    };

    const handleFormSubmit = async (values: ComicsCategoryFormValues): Promise<void> => {
        if (attributes && !readOnly) {
            const newEntityData: ComicsNewEntity = {
                ...values,
                title: {
                    uk: values.title,
                    en: ''
                },
                screenwriter: values.screenwriter ? values.screenwriter : null,
                artist: values.artist ? values.artist : null,
                pages: Number(values.pages),
                year: Number(values.year),
                description: {
                    uk: values.description,
                    en: ''
                },
                quantity: Number(values.quantity),
                preorder: false,
                character: values.character ? values.character : null,
                price: Number(values.price),
                discountPrice: values.discountPrice ? Number(values.discountPrice) : null
            };

            try {
                await POST({ url: '/api/v1/products', data: newEntityData });

                onSubmitSuccess && onSubmitSuccess();
            } catch (_) {
                onSubmitError && onSubmitError();
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <GridAutoFit>
                <InputAdapter
                    required
                    readOnly={readOnly}
                    name={formFields.title}
                    placeholder={translate('attributes.title.fillIn')}
                    valueGetter={getTranslatedInputValue}
                    label={translate('attributes.title')}
                    control={control}
                />
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.price}
                        placeholder={translate('attributes.price.fillIn')}
                        label={translate('attributes.price')}
                        control={control}
                    />
                    <InputAdapter
                        readOnly={readOnly}
                        name={formFields.discountPrice}
                        placeholder={translate('attributes.price.discount.fillIn')}
                        label={translate('attributes.price.discount')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.publishingHouse}
                        items={publishingHouse?.cases}
                        placeholder={translate('attributes.publishingHouse.choose')}
                        label={translate('attributes.publishingHouse')}
                        control={control}
                    />
                    <DropdownAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.label}
                        items={label?.cases}
                        placeholder={translate('attributes.label.choose')}
                        label={translate('attributes.label')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.language}
                        customItems={language?.translations}
                        itemValueGetter={getTranslatedDropdownValue}
                        placeholder={translate('attributes.language.choose')}
                        label={translate('attributes.language')}
                        control={control}
                    />
                    <DropdownAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.format}
                        items={format?.cases}
                        placeholder={translate('attributes.format.choose')}
                        label={translate('attributes.format')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.cover}
                        customItems={cover?.translations}
                        itemValueGetter={getTranslatedDropdownValue}
                        placeholder={translate('attributes.cover.choose')}
                        label={translate('attributes.cover')}
                        control={control}
                    />
                    <DropdownAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.condition}
                        customItems={condition?.translations}
                        itemValueGetter={getTranslatedDropdownValue}
                        placeholder={translate('attributes.condition.choose')}
                        label={translate('attributes.condition')}
                        control={control}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.pages}
                        placeholder={translate('attributes.pages.fillIn')}
                        label={translate('attributes.pages')}
                        control={control}
                    />
                    <InputAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.year}
                        placeholder={translate('attributes.year.fillIn')}
                        label={translate('attributes.year')}
                        control={control}
                    />
                </GridAutoFit>
                <DropdownAdapter
                    multiselect
                    readOnly={readOnly}
                    name={formFields.screenwriter}
                    customItems={screenwriter?.translations}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.screenwriter.choose')}
                    label={translate('attributes.screenwriter')}
                    control={control}
                />
                <DropdownAdapter
                    multiselect
                    readOnly={readOnly}
                    name={formFields.artist}
                    customItems={artist?.translations}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.artist.choose')}
                    label={translate('attributes.artist')}
                    control={control}
                />
                <DropdownAdapter
                    multiselect
                    readOnly={readOnly}
                    name={formFields.character}
                    customItems={character?.translations}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.character.choose')}
                    label={translate('attributes.character')}
                    control={control}
                />
                <DropdownAdapter
                    required
                    multiselect
                    readOnly={readOnly}
                    name={formFields.genre}
                    customItems={genre?.translations}
                    itemValueGetter={getTranslatedDropdownValue}
                    placeholder={translate('attributes.genre.choose')}
                    label={translate('attributes.genre')}
                    control={control}
                />
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.quantity}
                        placeholder={translate('attributes.quantity.fillIn')}
                        label={translate('attributes.quantity')}
                        control={control}
                    />
                    <InputAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.isbn}
                        placeholder={translate('attributes.isbn.fillIn')}
                        label="ISBN"
                        control={control}
                    />
                </GridAutoFit>
                <div className={classes.descriptionField}>
                    <InputAdapter
                        required
                        readOnly={readOnly}
                        name={formFields.description}
                        valueGetter={getTranslatedInputValue}
                        placeholder={translate('attributes.description.fillIn')}
                        label={translate('attributes.description')}
                        control={control}
                    />
                </div>
            </GridAutoFit>
            {
                !readOnly && (
                    <div className={classes.actionButtonWrapper}>
                        <Button variant="primary" type="submit">{translate('add')}</Button>
                    </div>
                )
            }
        </form>
    );
};

export default ComicsCategory;