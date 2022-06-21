import { useForm } from 'react-hook-form';
import { useTranslation } from '../../../components/IntlProvider';
import DropdownAdapter from '../../../components/FormAdapter/Dropdown';
import InputAdapter from '../../../components/FormAdapter/Input';
import { GridAutoFit } from '../../../layouts/Grid';
import { categories } from '../constants';
import Button from '../../../components/Button';
import { ComicsAttributes, ComicsCategoryFormValues } from './types';
import { fieldsNeedTranslations } from './constants';
import { getAllTranslationForFields } from '../../../utils';
import { POST } from '../../../utils/api';
import { useCachedAPI } from '../../../hooks';
import classes from './styles/comicsCategory.module.css';

const ComicsCategory = () => {
    const { language: userLanguage, translate } = useTranslation();
    const { control, handleSubmit } = useForm<ComicsCategoryFormValues>();

    const { data: attributes } = useCachedAPI<ComicsAttributes>(`/api/v1/attributes?category=${categories.comics}`);

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

    const coverItems = cover?.cases.map((c) => ({ id: c, value: translate(`'attributes.cover.${c}`) }));
    const languageItems = language?.cases.map((l) => ({ id: l, value: translate(`'attributes.language.${l}`) }));
    const conditionItems = condition?.cases.map((c) => ({ id: c, value: translate(`'attributes.condition.${c}`) }));

    const handleFormSubmit = async (values: ComicsCategoryFormValues): Promise<void> => {
        if (attributes) {
            const fieldsWithTranslations = getAllTranslationForFields<ValuesOfArray<typeof fieldsNeedTranslations>>({
                fields: fieldsNeedTranslations,
                values: values,
                language: userLanguage,
                translationData: attributes
            });

            const newEntityData = {
                ...values,
                ...fieldsWithTranslations,
                condition: values.condition.id,
                cover: values.cover.id,
                language: values.language.id,
                pages: Number(values.pages),
                price: Number(values.price),
                priceDiscount: values.priceDiscount ? Number(values.priceDiscount) : null,
                year: Number(values.year),
                quantity: Number(values.quantity),
                description: {
                    uk: values.description
                }
            };

            await POST({
                url: '/api/v1/products',
                data: newEntityData
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <GridAutoFit>
                <InputAdapter
                    name="title"
                    control={control}
                    type="text"
                    label={translate('attributes.title')}
                    placeholder={translate('attributes.title.fillIn')}
                />
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        name="price"
                        control={control}
                        type="text"
                        label={translate('attributes.price')}
                        placeholder={translate('attributes.price.fillIn')}
                    />
                    <InputAdapter
                        name="priceDiscount"
                        control={control}
                        type="text"
                        label={translate('attributes.price.discount')}
                        placeholder={translate('attributes.price.discount.fillIn')}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        name="publishingHouse"
                        control={control}
                        items={publishingHouse?.cases}
                        label={translate('attributes.publishingHouse')}
                        placeholder={translate('attributes.publishingHouse.choose')}
                    />
                    <DropdownAdapter
                        name="label"
                        control={control}
                        items={label?.cases}
                        label={translate('attributes.label')}
                        placeholder={translate('attributes.label.choose')}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        name="language"
                        control={control}
                        items={languageItems}
                        label={translate('attributes.language')}
                        placeholder={translate('attributes.language.choose')}
                    />
                    <DropdownAdapter
                        name="format"
                        control={control}
                        items={format?.cases}
                        label={translate('attributes.format')}
                        placeholder={translate('attributes.format.choose')}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <DropdownAdapter
                        name="cover"
                        control={control}
                        items={coverItems}
                        label={translate('attributes.cover')}
                        placeholder={translate('attributes.cover.choose')}
                    />
                    <DropdownAdapter
                        name="condition"
                        control={control}
                        items={conditionItems}
                        label={translate('attributes.condition')}
                        placeholder={translate('attributes.condition.choose')}
                    />
                </GridAutoFit>
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        name="pages"
                        control={control}
                        type="text"
                        label={translate('attributes.pages')}
                        placeholder={translate('attributes.pages.fillIn')}
                    />
                    <InputAdapter
                        name="year"
                        control={control}
                        type="text"
                        label={translate('attributes.year')}
                        placeholder={translate('attributes.year.fillIn')}
                    />
                </GridAutoFit>
                <DropdownAdapter
                    name="screenwriter"
                    control={control}
                    items={screenwriter?.cases}
                    label={translate('attributes.screenwriter')}
                    placeholder={translate('attributes.screenwriter.choose')}
                />
                <DropdownAdapter
                    name="artist"
                    control={control}
                    items={artist?.cases}
                    label={translate('attributes.artist')}
                    placeholder={translate('attributes.artist.choose')}
                />
                <DropdownAdapter
                    name="character"
                    control={control}
                    items={character?.cases}
                    label={translate('attributes.character')}
                    placeholder={translate('attributes.character.choose')}
                />
                <DropdownAdapter
                    name="genre"
                    control={control}
                    items={genre?.cases}
                    label={translate('attributes.genre')}
                    placeholder={translate('attributes.genre.choose')}
                />
                <GridAutoFit gridColumnMinWidth={150}>
                    <InputAdapter
                        name="quantity"
                        control={control}
                        type="text"
                        label={translate('attributes.quantity')}
                        placeholder={translate('attributes.quantity.fillIn')}
                    />
                    <InputAdapter
                        name="isbn"
                        control={control}
                        type="text"
                        label="ISBN"
                        placeholder={translate('attributes.isbn.fillIn')}
                    />
                </GridAutoFit>
                <div className={classes.descriptionField}>
                    <InputAdapter
                        name="description"
                        control={control}
                        type="text"
                        label={translate('attributes.description')}
                        placeholder={translate('attributes.description.fillIn')}
                    />
                </div>
            </GridAutoFit>
            <div className={classes.actionButtonWrapper}>
                <Button variant="primary" type="submit">{translate('add')}</Button>
            </div>
        </form>
    );
};

export { ComicsCategory };