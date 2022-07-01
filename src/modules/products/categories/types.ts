import { categories } from './constants';
import { Translation } from '../../../components/IntlProvider';

export type Categories = ValuesOfObject<typeof categories>;

export type AttributeItem<Case = string> = {
    cases: Case[];
    translations?: Translation[];
};

export type CategoryProps<D> = {
    formData?: D;
    readOnly?: boolean;
    onSubmitSuccess?: () => void;
    onSubmitError?: () => void;
};