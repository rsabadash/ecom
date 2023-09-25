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

export type CategoryFormDefaultValues = Partial<CategoryFormValues>;

export type CategoryFormSubmitAction = (
  values: CategoryFormValues,
) => Promise<void>;

export type CategoryFormProps = {
  submitText: string;
  isReadOnly?: boolean;
  defaultValues?: CategoryFormDefaultValues;
  handleFormSubmit: CategoryFormSubmitAction;
  dropdownCategoriesUrl: string;
};

export type CategoryStateFromRouter = Category | null;

export type CategoryPostData = Omit<Category, '_id'>;

export type CategoryPostResponse = Category;

export type CategoryPatchData = Omit<Category, '_id'> & {
  id: string;
};

export type CategoryDeleteData = {
  id: string;
};
