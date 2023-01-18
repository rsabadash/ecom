import { FC } from 'react';
import { GridAutoFit, GridFullWidth } from '../../layouts/Grid';
import { useCachedAPI } from '../../hooks';
import { useTranslation } from '../../components/IntlProvider';
import {
  DropdownAdapter,
  MultiLanguageInputAdapter,
} from '../../components/FormFieldsAdapter';
import { formFields } from './constants';
import { Button } from '../../components/Button';
import { CheckboxAdapter } from '../../components/FormFieldsAdapter/CheckboxAdabter/CheckboxAdapter';
import { CategoryFormProps } from './types';
import { endpoint } from '../../common/constants/api';
import { DropdownItem } from '../../components/Fields/Dropdown';
import { Form } from '../../components/FormFields/Form';
import { useCategoriesFrom } from './hooks/useCategoriesFrom';
import { useCategoriesFormSubmit } from './hooks/useCategoriesFormSubmit';
import { deleteCategory } from './api';

export const CategoryForm: FC<CategoryFormProps> = ({
  id,
  isReadOnly,
  defaultValues,
}) => {
  const { data: categoriesDropdownList } = useCachedAPI<DropdownItem[]>(
    `${endpoint.categories}/dropdown-list`,
  );

  const { translate } = useTranslation();

  const { handleFormSubmit } = useCategoriesFormSubmit({ id });

  const { control, handleSubmit } = useCategoriesFrom({
    defaultValues,
    shouldReset: isReadOnly,
    submitHandler: handleFormSubmit,
  });

  const handleDeleteCategory = async () => {
    await deleteCategory(id);
  };

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
                {shouldUpdateCategory
                  ? translate('category.update')
                  : translate('category.add')}
              </Button>
              {shouldUpdateCategory && (
                <Button variant="danger" onClick={handleDeleteCategory}>
                  {translate('category.delete')}
                </Button>
              )}
            </div>
          </GridFullWidth>
        )}
      </GridAutoFit>
    </Form>
  );
};
