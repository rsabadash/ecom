import { InputProps } from '../../Fields/Input';
import { FieldLabelProps } from '../FieldLabel';

export type InputFormFieldProps =
    Omit<InputProps, 'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'>
    & Pick<FieldLabelProps, 'label'>
    & {
        errorMessage?: string;
        isDescriptionHidden?: boolean;
    };