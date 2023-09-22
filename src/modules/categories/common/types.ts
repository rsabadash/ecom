import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { Translations } from '../../../components/IntlProvider';

export type Category = {
  _id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  parentIds: string[];
};

export type CategoryFormValues = {
  name: Translations;
  seoName: string;
  isActive: boolean;
  parentIds: DropdownItemObject[];
};

export type CategoryFormFields = Record<
  keyof CategoryFormValues,
  keyof CategoryFormValues
>;

export type CategoryFormSubmitAction = (
  values: CategoryFormValues,
) => Promise<void>;

export type CategoryFormDefaultValues = Partial<CategoryFormValues>;

export type CategoryFormProps = {
  isReadOnly?: boolean;
  submitText: string;
  defaultValues?: CategoryFormDefaultValues;
  handleFormSubmit: CategoryFormSubmitAction;
  dropdownCategoriesUrl: string;
};