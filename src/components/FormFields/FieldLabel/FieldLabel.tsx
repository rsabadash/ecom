import { FC } from 'react';
import clsx from 'clsx';

import { useTranslation } from '../../IntlProvider';
import { Label } from '../../Label';
import { FieldLabelProps } from './types';

import classes from './styles/index.module.css';

export const FieldLabel: FC<FieldLabelProps> = ({
  size,
  label,
  htmlFor,
  isValid = true,
  isReadOnly,
  isRequired,
  fieldLabelClassName,
}) => {
  const { translate } = useTranslation();
  const itemLabel =
    isRequired && !isReadOnly
      ? `${label} (${translate('required').toLowerCase()})`
      : label;

  const fieldLabelClassNames = clsx(
    classes.fieldLabel,
    {
      [classes.fieldLabel_error]: !isValid,
      [classes.fieldLabel_readOnly]: isReadOnly,
    },
    fieldLabelClassName,
  );

  return (
    <Label size={size} htmlFor={htmlFor} labelClassName={fieldLabelClassNames}>
      {itemLabel}
    </Label>
  );
};
