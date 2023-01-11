import { categories } from './constants';
import { Translations } from '../../../components/IntlProvider';

export type Categories = ValuesOfObject<typeof categories>;

export type AttributeItem<Case = string> = {
    cases: Case[];
    translations?: Translations[];
};

export type CategoryProps<D> = {
    formData?: D;
    isReadOnly?: boolean;
    onSubmitSuccess?: () => void;
    onSubmitError?: () => void;
};