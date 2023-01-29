import { FC } from 'react';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { useCachedAPI } from '../../hooks';
import { useTranslation } from '../../components/IntlProvider';
import {
  DropdownAdapter,
  MultiLanguageInputAdapter,
} from '../../components/FormFieldsAdapter';
import { categoryFormFields } from './constants';
import { Button } from '../../components/Button';
import { CheckboxAdapter } from '../../components/FormFieldsAdapter/CheckboxAdabter/CheckboxAdapter';
import { CategoryFormProps } from './types';
import { endpoints, path } from '../../common/constants/api';
import { DropdownItem } from '../../components/Fields/Dropdown';
import { Form } from '../../components/FormFields';
import { useCategoryForm, useCategoryFormSubmit } from './hooks';

export const CategoryForm: FC<CategoryFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { data: categoriesDropdownList } = useCachedAPI<DropdownItem[]>(
    `${endpoints.categories.root}${path.dropdownList}`,
  );

  const { translate } = useTranslation();
  const { handleFormSubmit } = useCategoryFormSubmit({ id });

  const { control, handleSubmit } = useCategoryForm({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  const shouldUpdateCategory =
    defaultValues && Object.keys(defaultValues).length > 0;

  return (
    <Form onSubmit={handleSubmit}>
      <GridAutoFit>
        <GridFullWidth>
          <MultiLanguageInputAdapter
            isRequired
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={categoryFormFields.name}
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
            name={categoryFormFields.parentIds}
            items={categoriesDropdownList}
            placeholder={translate('category.parent.select')}
            label={translate('category.parent')}
            control={control}
          />
        </GridFullWidth>
        <GridFullWidth>
          <CheckboxAdapter
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={categoryFormFields.isActive}
            label={translate('category.active')}
            placeholder={translate('category.active.description')}
            control={control}
          />
        </GridFullWidth>
        {!isReadOnly && (
          <GridFullWidth>
            <Button variant="primary" type="submit" size="l">
              {shouldUpdateCategory ? translate('update') : translate('add')}
            </Button>
          </GridFullWidth>
        )}
      </GridAutoFit>
    </Form>
  );
};
