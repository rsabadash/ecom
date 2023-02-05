import { TextboxProps } from '../../Fields/Textbox';
import { FieldLabelProps } from '../FieldLabel';
import { CollapseControllerProps } from '../../Collapse';
import { CommonFormFieldWrapperProps } from '../CommonFormFieldWrapper/types';

export type TextboxFormFieldProps = Omit<
  TextboxProps,
  'id' | 'ariaLabel' | 'ariaLabelledBy' | 'ariaDescribedBy'
> &
  Pick<FieldLabelProps, 'label'> &
  Pick<
    CommonFormFieldWrapperProps,
    'errorMessage' | 'isDescriptionHidden' | 'columnIndex'
  >;

export type TextboxWithCollapseFormFieldProps = TextboxFormFieldProps &
  Omit<CollapseControllerProps, 'onExpandFinished' | 'onCollapseFinished'>;
