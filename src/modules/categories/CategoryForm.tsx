import { FC } from 'react';

import { endpoints, path } from '../../common/constants/api';
import { useCachedAPI } from '../../common/hooks';
import { Button } from '../../components/Button';
import { DropdownItem } from '../../components/Fields/Dropdown';
import { Form, FormContent } from '../../components/FormFields';
import {
  DropdownAdapter,
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../components/FormFieldsAdapter';
import { CheckboxAdapter } from '../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../components/GridRowBalancer';
import { useTranslation } from '../../components/IntlProvider';
import { categoryFormFields } from './constants';
import { useCategoryForm, useCategoryFormSubmit } from './hooks';
import { CategoryFormProps } from './types';

export const CategoryForm: FC<CategoryFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const dropdownCategoriesUrl = id
    ? `${endpoints.categories.root}${path.dropdownList}?_id=${id}`
    : `${endpoints.categories.root}${path.dropdownList}`;

  const { data: categoriesDropdownList } = useCachedAPI<DropdownItem[]>(
    dropdownCategoriesUrl,
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
      <FormContent>
        <GridRowBalancer columns={2} elementRows={4}>
          <MultiLanguageInputAdapter
            isRequired
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={categoryFormFields.name}
            placeholderTranslation="category.name.description"
            label={translate('category.name')}
            control={control}
            columnIndex={1}
          />
          <DropdownAdapter
            hasMultiselect
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={categoryFormFields.parentIds}
            items={categoriesDropdownList}
            placeholder={translate('category.parent.description')}
            label={translate('category.parent')}
            control={control}
            columnIndex={2}
          />
          <InputAdapter
            isRequired
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={categoryFormFields.seoName}
            label={translate('category.seoName')}
            placeholder={translate('category.seoName.description')}
            control={control}
            columnIndex={3}
          />
          <CheckboxAdapter
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={categoryFormFields.isActive}
            label={translate('category.active')}
            placeholder={translate('category.active.description')}
            control={control}
            columnIndex={4}
          />
        </GridRowBalancer>
      </FormContent>
      {!isReadOnly && (
        <FormContent>
          <Button variant="primary" type="submit">
            {shouldUpdateCategory ? translate('update') : translate('add')}
          </Button>
        </FormContent>
      )}
    </Form>
  );
};
