import { FC } from 'react';

import { useCachedAPI } from '../../../common/hooks';
import { Button } from '../../../components/Button';
import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { Form, FormContent } from '../../../components/FormFields';
import {
  CheckboxAdapter,
  DropdownAdapter,
  InputAdapter,
  MultiLanguageInputAdapter,
} from '../../../components/FormFieldsAdapter';
import { GridRowBalancer } from '../../../components/GridRowBalancer';
import { useTranslation } from '../../../components/IntlProvider';
import { GridAutoFit } from '../../../layouts/Grid';
import { categoryFormFields } from './constants';
import { useCategoryForm } from './hooks';
import { CategoryFormProps } from './types';

export const CategoryForm: FC<CategoryFormProps> = ({
  submitText,
  isReadOnly,
  defaultValues,
  handleFormReset,
  handleFormSubmit,
  dropdownCategoriesUrl,
}) => {
  const { data: categoriesDropdownList } = useCachedAPI<DropdownItemObject[]>(
    dropdownCategoriesUrl,
    {
      shouldFetch: !!dropdownCategoriesUrl,
    },
  );

  const { translate } = useTranslation();

  const { control, handleSubmit } = useCategoryForm({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

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
            isReadOnly={isReadOnly}
            isDescriptionHidden={isReadOnly}
            name={categoryFormFields.parent}
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
            control={control}
            columnIndex={4}
          />
        </GridRowBalancer>
      </FormContent>
      {!isReadOnly && (
        <FormContent>
          <GridAutoFit>
            <Button variant="primary" type="submit">
              {submitText}
            </Button>
            <Button variant="regular" onClick={handleFormReset}>
              {translate('cancel')}
            </Button>
          </GridAutoFit>
        </FormContent>
      )}
    </Form>
  );
};
