import { InputProps } from '../../Fields/Input';
import { FieldLabelProps } from '../FieldLabel';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';
import { CollapseControllerProps } from '../../Collapse';

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
  Pick<CollapseControllerProps, 'isToggleHidden'>;
