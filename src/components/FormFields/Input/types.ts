import { InputProps } from '../../Fields/Input';
import { FieldLabelProps } from '../FieldLabel';
import { CollapseControllerProps } from '../../Collapse';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';

export type InputFormFieldProps = Omit<
  InputProps,
  'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy' | 'inputClassName'
> &
  Pick<FieldLabelProps, 'label'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isDescriptionHidden' | 'columnIndex'
  >;

export type InputWithCollapseFormFieldProps = InputFormFieldProps &
  Omit<CollapseControllerProps, 'onExpandFinished' | 'onCollapseFinished'>;
