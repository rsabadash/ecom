import { FC } from 'react';
import { GridFullWidth } from '../../layouts/Grid';
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
import { GridRowBalancer } from '../../components/GridRowBalancer';

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
      <GridRowBalancer columns={2} elementRows={4}>
        <MultiLanguageInputAdapter
          isRequired
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={categoryFormFields.name}
          placeholderTranslation="category.name.fillIn"
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
          placeholder={translate('category.parent.select')}
          label={translate('category.parent')}
          control={control}
          columnIndex={2}
        />
        <CheckboxAdapter
          isReadOnly={isReadOnly}
          isDescriptionHidden={isReadOnly}
          name={categoryFormFields.isActive}
          label={translate('category.active')}
          placeholder={translate('category.active.description')}
          control={control}
          columnIndex={3}
        />
      </GridRowBalancer>
      {!isReadOnly && (
        <GridFullWidth>
          <Button variant="primary" type="submit" size="l">
            {shouldUpdateCategory ? translate('update') : translate('add')}
          </Button>
        </GridFullWidth>
      )}
    </Form>
  );
};
