import { DropdownItemObject } from '../../../components/Fields/Dropdown';
import { Translations } from '../../../components/IntlProvider';
import { CategoryDetailData } from '../detail/types';

export type Category = {
  _id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  childrenIds: string[];
  parentIdsHierarchy: string[];
};

export type CategoryFormValues = {
  name: Translations;
  seoName: string;
  isActive: boolean;
  parent: DropdownItemObject | null;
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
  handleFormReset: () => void;
  handleFormSubmit: CategoryFormSubmitAction;
  dropdownCategoriesUrl: string;
};

export type CategoryStateFromRouter = CategoryDetailData | null;

export type CategoryPostData = Omit<
  Category,
  '_id' | 'childrenIds' | 'parentIdsHierarchy'
> & {
  parentId: string | null;
};

export type CategoryPostResponse = CategoryDetailData;

export type CategoryPatchData = Omit<
  Category,
  '_id' | 'childrenIds' | 'parentIdsHierarchy'
> & {
  id: string;
  parentId: string | null;
};

export type CategoryDeleteData = {
  id: string;
};
