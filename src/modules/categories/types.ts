import { Translations } from '../../components/IntlProvider';
import { DropdownItem } from '../../components/Fields/Dropdown';

export type Category = {
  _id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  parentIds: string[];
};

export type CategoryDetailEntity = Omit<Category, 'parentIds'> & {
  parents: Category[];
};

export type CategoryFormValues = {
  name: Translations;
  seoName: string;
  isActive: boolean;
  parentIds: DropdownItem[];
};

export type CategoryFormFields = Record<
  keyof CategoryFormValues,
  keyof CategoryFormValues
>;

export type CategoryFormProps = {
  id?: string;
  isReadOnly?: boolean;
  defaultValues?: Partial<CategoryFormValues>;
};

export type CategoryPostData = {
  name: Translations;
  seoName: string;
  isActive: boolean;
  parentIds: string[];
};

export type CategoryPostResponse = {
  _id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  parents: Category[];
};

export type CategoryPatchData = {
  id: string;
  name: Translations;
  seoName: string;
  isActive: boolean;
  parentIds: string[];
};

export type CategoryDeleteData = {
  id: string;
};

export type CategoryUrlParams = {
  categoryId: string;
};
